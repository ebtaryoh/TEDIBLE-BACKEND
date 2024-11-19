const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "Please provide your first name"] },
    lastName: { type: String, required: [true, "Please provide your last name"] },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
      match: [/^(\+234|0)(70|80|81|90|91)\d{8}$/, "Invalid phone number"],
    },
    password: { type: String, required: [true, "Please provide a password"] },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    avatar: {
      type: String,
      default: "https://default-avatar.url/image.png",
    },
  },
  { timestamps: true }
);

userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 3600000;
  return resetToken;
};

userSchema.statics.updateAvatar = async function (userId, avatarUrl) {
  await this.findByIdAndUpdate(userId, { avatar: avatarUrl });
};

module.exports = mongoose.model("Usermodel", userSchema);
