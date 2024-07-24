const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide your full name"] },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address"],
    },
    role: {
      type: String,
      enum: ["user", "vendor"],
      required: true,
      default: "user",
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
      match: [/^(\+234|0)(70|80|81|90)\d{8}$/, "Invalid phone number"],
    },
    password: { type: String, required: [true, "Please provide a password"] },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    avatar: {
      type: String,
      default:
        "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
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

module.exports = mongoose.model("User", userSchema);
