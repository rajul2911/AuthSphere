const rateLimit = require("express-rate-limit");

/**
 * 🔐 Login rate limiter
 * Prevents brute-force attacks
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 5 attempts per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many login attempts. Please try again after 15 minutes.",
    });
  },
});

/**
 * 🧾 Signup rate limiter
 * Prevents account spam
 */
const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 signups per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many accounts created from this IP. Try again later.",
    });
  },
});

module.exports = { loginLimiter, signupLimiter };