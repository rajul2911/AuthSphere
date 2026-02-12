const express = require("express");
const {
  signup,
  login,
  logout,
  logoutAllDevices,
  getMe,
  refreshAccessToken,
  updateProfile,
  changePassword,
  getSessions,
  logoutSession,
} = require("../controllers/auth.controller");
const csrfProtect = require("../middleware/csrf.middleware");

const { protect } = require("../middleware/auth.middleware");
const validateRequest = require("../middleware/validation.middleware");
const {
  signupValidator,
  loginValidator,
} = require("../validators/auth.validator");
const {
  loginLimiter,
  signupLimiter,
} = require("../middleware/rateLimit.middleware");

const router = express.Router();

/* =======================
   PUBLIC AUTH ROUTES
======================= */

// Signup (rate limited)
router.post(
  "/signup",
  signupLimiter,
  ...signupValidator,
  validateRequest,
  signup
);

// Login (rate limited)
router.post(
  "/login",
  loginLimiter,
  ...loginValidator,
  validateRequest,
  login
);

/* =======================
   TOKEN LIFECYCLE
======================= */

// Refresh access token
router.post("/refresh", refreshAccessToken);

/* =======================
   PROTECTED USER ROUTES
======================= */

// Logout current device
router.post("/logout", protect, csrfProtect, logout);

// Logout all devices
router.post("/logout-all", protect, csrfProtect, logoutAllDevices);

router.patch("/profile", protect, updateProfile);

router.patch("/change-password", protect, changePassword);

router.get("/sessions", protect, getSessions);
router.post("/logout-session", protect, logoutSession);

// Get current user
router.get("/me", protect, getMe);

module.exports = router;
