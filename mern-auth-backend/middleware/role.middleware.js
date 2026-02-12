const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user is already set by auth middleware
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient permissions",
      });
    }

    next();
  };
};

module.exports = { authorizeRoles };
