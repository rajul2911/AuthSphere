const AppError = require("../utils/AppError");

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError("Access denied", 403);
    }
    next();
  };
};

module.exports = authorize;
