// const express = require("express");
// const router = express.Router();

// const { protect } = require("../middleware/auth.middleware");
// const authorize = require("../middleware/authorize.middleware");

// const {
//   getAllUsers,
//   getUserById,
//   updateUserRole,
//   deactivateUser,
//   getAuditLogs,
//   getAdminStats,
// } = require("../controllers/admin.controller");

// // All routes are admin-protected
// router.use(protect, authorize("admin"));

// router.get("/users", getAllUsers);
// router.get("/users/:id", getUserById);
// router.get("/audit-logs", getAuditLogs);
// router.get("/stats", getAdminStats);

// router.patch("/users/:id/role", updateUserRole);
// router.patch("/users/:id/deactivate", deactivateUser);

// module.exports = router;


const express = require("express");

const {
  getAllUsers,
  getUserById,
  updateUserRole,
  deactivateUser,
  getAuditLogs,
  getAdminStats,
} = require("../controllers/admin.controller");

const { protect } = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");

const router = express.Router();

/* =======================
   ADMIN PROTECTED ROUTES
======================= */

// Dashboard analytics
router.get(
  "/stats",
  protect,
  authorize("admin"),
  getAdminStats
);

// Get all users
router.get(
  "/users",
  protect,
  authorize("admin"),
  getAllUsers
);

// Get single user
router.get(
  "/users/:id",
  protect,
  authorize("admin"),
  getUserById
);

// Update role
router.patch(
  "/users/:id/role",
  protect,
  authorize("admin"),
  updateUserRole
);

// Deactivate user
router.patch(
  "/users/:id/deactivate",
  protect,
  authorize("admin"),
  deactivateUser
);

// Audit logs
router.get(
  "/audit-logs",
  protect,
  authorize("admin"),
  getAuditLogs
);

module.exports = router;

