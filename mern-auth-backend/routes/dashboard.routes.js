const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

const router = express.Router();

router.get("/manager", protect, authorizeRoles("manager"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Manager Dashboard",
    user: req.user,
  });
});

router.get("/employee", protect, authorizeRoles("employee"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Employee Dashboard",
    user: req.user,
  });
});

module.exports = router;
