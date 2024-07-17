const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide your full name"] },
    username: { type: String, required: [true, "Please provide a username"], unique: true },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address"],
    },
    role: { type: String, enum: ["user", "vendor"], 
      default: "user" 
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
      match: [/^(\+234|0)(70|80|81|90)\d{8}$/, "Invalid phone number"],
    },
    password: { type: String, required: [true, "Please provide a password"] },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpires = Date.now() + 3600000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
