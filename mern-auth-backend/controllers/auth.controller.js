const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const generateCsrfToken = require("../utils/generateCsrfToken");
const asyncHandler = require("../utils/asyncHandler");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

const { v4: uuidv4 } = require("uuid");

/* ======================================================
   Helper: Set Auth + CSRF Cookies
====================================================== */

const setAuthCookies = (res, accessToken, refreshToken, sessionId) => {

  const cookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
  path: "/",   // ⚠️ IMPORTANT
};


  // Access token
  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
  });

  // Refresh token
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Session ID
  res.cookie("sessionId", sessionId, {
    ...cookieOptions,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // CSRF token
  const csrfToken = generateCsrfToken();

  res.cookie("csrfToken", csrfToken, {
    ...cookieOptions,
    httpOnly: false,
  });
};

/* ======================================================
   Clear All Cookies
====================================================== */

const clearAuthCookies = (res) => {
  console.log("Clearing auth cookies");
  const cookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
  path: "/",   // ⚠️ IMPORTANT
};


  // res.cookie("accessToken", "", options);
  // res.cookie("refreshToken", "", options);
  // res.cookie("sessionId", "", options);

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  res.clearCookie("sessionId", cookieOptions);

  res.cookie("csrfToken", "", {
    ...cookieOptions,
    httpOnly: false,
  });
};

/* ======================================================
   Signup
====================================================== */

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const user = await User.create({
    name,
    email,
    password,
    role: "employee",
  });

  const sessionId = uuidv4();

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.sessions.push({
    sessionId,
    refreshToken,
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip,
  });

  await user.save();

  setAuthCookies(res, accessToken, refreshToken, sessionId);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/* ======================================================
   Login
====================================================== */

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }

  user.lastLogin = new Date();

  const sessionId = uuidv4();

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.sessions.push({
    sessionId,
    refreshToken,
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip,
  });

  await user.save();

  setAuthCookies(res, accessToken, refreshToken, sessionId);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/* ======================================================
   Refresh Token
====================================================== */

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;

  if (!refreshToken || !sessionId) {
    throw new AppError("Session missing", 401);
  }

  let decoded;

  try {
    decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch {
    throw new AppError("Invalid refresh token", 401);
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError("User not found", 401);
  }

  const session = user.sessions.find(
    (s) => s.sessionId === sessionId
  );

  if (!session || session.refreshToken !== refreshToken) {
    user.sessions = [];
    await user.save();

    throw new AppError("Session hijack detected", 403);
  }

  const newAccessToken = generateAccessToken(user._id);
  const newRefreshToken = generateRefreshToken(user._id);

  session.refreshToken = newRefreshToken;
  session.lastUsedAt = new Date();

  await user.save();

  setAuthCookies(res, newAccessToken, newRefreshToken, sessionId);

  res.status(200).json({
    success: true,
    message: "Token refreshed",
  });
});

/* ======================================================
   Logout (Single Device)
====================================================== */

const logout = asyncHandler(async (req, res) => {
  const { sessionId } = req.cookies;

  console.log("Logging out session:", sessionId);

  if (sessionId && req.user) {
    req.user.sessions = req.user.sessions.filter(
      (s) => s.sessionId !== sessionId
    );

    await req.user.save();
  }

  clearAuthCookies(res);

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

/* ======================================================
   Logout All Devices
====================================================== */

const logoutAllDevices = asyncHandler(async (req, res) => {
  req.user.sessions = [];

  await req.user.save();

  clearAuthCookies(res);

  res.status(200).json({
    success: true,
    message: "Logged out from all devices",
  });
});

/* ======================================================
   Get Current User
====================================================== */

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -sessions"
  );

  res.status(200).json({
    success: true,
    data: user,
  });
});

/* ======================================================
   Update Profile
====================================================== */

const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = ["name", "email"];

  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field]) {
      updates[field] = req.body[field];
    }
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    updates,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: user,
  });
});

/* ======================================================
   Change Password
====================================================== */

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new AppError("All fields are required", 400);
  }

  if (newPassword.length < 8) {
    throw new AppError("Password too short", 400);
  }

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    throw new AppError("Incorrect password", 401);
  }

  user.password = newPassword;
  user.sessions = [];

  await user.save();

  clearAuthCookies(res);

  res.status(200).json({
    success: true,
    message: "Password changed. Please login again.",
  });
});

/* ======================================================
   Sessions
====================================================== */

const getSessions = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user.sessions,
  });
});

const logoutSession = asyncHandler(async (req, res) => {
  console.log("Request to logout session:", req.body);
  console.log("Logout controller ke andar");
  const { sessionId } = req.body;

  if (!sessionId) {
    throw new AppError("Session ID required", 400);
  }

  console.log("Logging out session:", sessionId);

  req.user.sessions = req.user.sessions.filter(
    (s) => s.sessionId !== sessionId
  );

  await req.user.save();

  if (req.cookies.sessionId === sessionId) {
    console.log("Pre Cookie clearing for session:", sessionId);
    clearAuthCookies(res);
    console.log("Post Cookie clearing for session:", sessionId);
  }

  res.status(200).json({
    success: true,
    message: "Session terminated",
  });
});

/* ======================================================
   EXPORTS
====================================================== */

module.exports = {
  signup,
  login,
  refreshAccessToken,
  logout,
  logoutAllDevices,
  getMe,
  updateProfile,
  changePassword,
  getSessions,
  logoutSession,
};
