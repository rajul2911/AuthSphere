const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false, // Hide by default
    },

    role: {
      type: String,
      enum: ["employee", "manager", "admin"],
      default: "employee",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
    },

    sessions: [
      {
        sessionId: {
          type: String,
          required: true,
        },

        refreshToken: {
          type: String,
          required: true,
        },

        userAgent: {
          type: String,
        },

        ipAddress: {
          type: String,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },

        lastUsedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,

    // Hide sensitive fields globally
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.sessions;
        delete ret.__v;
        return ret;
      },
    },
  }
);

/* ======================================================
   Hash password before save
====================================================== */

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return ;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});

/* ======================================================
   Compare Password
====================================================== */

userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

/* ======================================================
   Export
====================================================== */

module.exports = mongoose.model("User", userSchema);
