const User = require("../models/User");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const AuditLog = require("../models/AuditLog");

/* ======================================================
   GET ALL USERS
   @route   GET /api/admin/users
   @access  Admin
====================================================== */

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -sessions");

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

/* ======================================================
   GET USER BY ID
   @route   GET /api/admin/users/:id
   @access  Admin
====================================================== */

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select(
    "-password -sessions"
  );

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/* ======================================================
   UPDATE USER ROLE
   @route   PATCH /api/admin/users/:id/role
   @access  Admin
====================================================== */

const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  // Allow only these roles
  if (!["employee", "manager"].includes(role)) {
    throw new AppError("Invalid role", 400);
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Cannot modify admins
  if (user.role === "admin") {
    throw new AppError("Cannot modify admin role", 403);
  }

  // Cannot modify yourself
  if (user._id.toString() === req.user._id.toString()) {
    throw new AppError("You cannot change your own role", 403);
  }

  const oldRole = user.role;

  // No-op protection
  if (oldRole === role) {
    return res.status(200).json({
      success: true,
      message: "Role already set",
    });
  }

  user.role = role;
  await user.save();

  // Audit log
  await AuditLog.create({
    action: "ROLE_UPDATE",
    performedBy: req.user._id,
    targetUser: user._id,
    oldValue: oldRole,
    newValue: role,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res.status(200).json({
    success: true,
    message: "User role updated",
    data: {
      id: user._id,
      role: user.role,
    },
  });
});

/* ======================================================
   DEACTIVATE USER
   @route   PATCH /api/admin/users/:id/deactivate
   @access  Admin
====================================================== */

const deactivateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Cannot deactivate yourself
  if (user._id.toString() === req.user._id.toString()) {
    throw new AppError("You cannot deactivate yourself", 403);
  }

  // Already inactive
  if (!user.isActive) {
    return res.status(200).json({
      success: true,
      message: "User already inactive",
    });
  }

  user.isActive = false;
  user.sessions = [];

  await user.save();

  // Audit log
  await AuditLog.create({
    action: "USER_DEACTIVATED",
    performedBy: req.user._id,
    targetUser: user._id,
    oldValue: "active",
    newValue: "inactive",
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res.status(200).json({
    success: true,
    message: "User deactivated",
  });
});

/* ======================================================
   GET AUDIT LOGS
   @route   GET /api/admin/audit-logs
   @access  Admin
====================================================== */

const getAuditLogs = asyncHandler(async (req, res) => {
  const logs = await AuditLog.find()
    .populate("performedBy", "name email")
    .populate("targetUser", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: logs.length,
    data: logs,
  });
});

/* ======================================================
   Admin Status Endpoint
====================================================== */


const getAdminStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();

  const activeUsers = await User.countDocuments({
    isActive: true,
  });

  const activeSessionsAgg = await User.aggregate([
    { $project: { sessionsCount: { $size: "$sessions" } } },
    { $group: { _id: null, total: { $sum: "$sessionsCount" } } },
  ]);

  const activeSessions =
    activeSessionsAgg[0]?.total || 0;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const newUsers = await User.countDocuments({
    createdAt: { $gte: sevenDaysAgo },
  });

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      activeUsers,
      activeSessions,
      newUsers,
    },
  });
});


/* ======================================================
   EXPORTS
====================================================== */

module.exports = {
  getAllUsers,
  getUserById,
  updateUserRole,
  deactivateUser,
  getAuditLogs,
  getAdminStats,
};
