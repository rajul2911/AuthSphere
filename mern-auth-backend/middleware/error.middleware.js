const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate field value entered";
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // Dev vs Prod behavior
  if (process.env.NODE_ENV === "production") {
    res.status(statusCode).json({
      success: false,
      message,
      error: err,
      stack: err.stack,
    });
  } else {
    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

module.exports = errorHandler;
