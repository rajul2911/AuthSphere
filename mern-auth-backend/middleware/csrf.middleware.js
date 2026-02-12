const AppError = require("../utils/AppError");

const csrfProtect = (req, res, next) => {
  // Only protect state-changing requests
  const safeMethods = ["GET", "HEAD", "OPTIONS"];
  if (safeMethods.includes(req.method)) {
    return next();
  }

  const csrfCookie = req.cookies.csrfToken;
  const csrfHeader = req.headers["x-csrf-token"];

  if (!csrfCookie || !csrfHeader) {
    throw new AppError("CSRF token missing", 403);
  }

  if (csrfCookie !== csrfHeader) {
    throw new AppError("Invalid CSRF token", 403);
  }

  next();
};

module.exports = csrfProtect;
