const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const errorHandler = require("./middleware/error.middleware");
const adminRoutes = require("./routes/admin.routes");

dotenv.config();

// Connect to database
connectDB();

const app = express();

/* =======================
   GLOBAL MIDDLEWARES
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
  cors({
    origin: ["http://localhost:5173"], // Vite frontend
    credentials: true,
  })
);

/* =======================
   ROUTES
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth Server Running",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


/* =======================
   ERROR HANDLER (LAST)
======================= */
app.use(errorHandler);

/* =======================
   SERVER START
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
