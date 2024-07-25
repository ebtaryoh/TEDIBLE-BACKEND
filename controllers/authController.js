const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/sendMail");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

const registerUser = async (req, res, next) => {
  const { name, username, email, phone, password, role = "user" } = req.body;
  if (!name || !username || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!["user", "vendor"].includes(role)) {
    return res.status(400).json({ message: "Invalid role value" });
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  try {
    const user = await User.create({ ...req.body, password: hashedPassword });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    const options = {
      email: user.email,
      subject: "Welcome to TEDIBLE",
      text: `Hi ${name}, Your registration is successful! Thank you for choosing us. We hope you enjoy our services.`,
    };

    await sendMail(options);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        phone: user.phone,
        role: user.role,
        avatar: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Please provide an email" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_BASE_URL}/reset-password/${resetToken}`;
    const options = {
      email: user.email,
      subject: "Reset Password",
      text: `You requested a password reset. Click the following link to reset your password: ${resetUrl}`,
    };

    await sendMail(options);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image file." });
    }

    const avatarUrl = req.file.path; // Cloudinary URL

    await User.updateAvatar(userId, avatarUrl);

    res.json({ message: "Avatar uploaded successfully!", avatarUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ avatarUrl: user.avatar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image file." });
    }

    const avatarUrl = req.file.path; // Cloudinary URL

    await User.updateAvatar(userId, avatarUrl);

    res.json({ message: "Avatar updated successfully!", avatarUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAvatar = async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove avatar URL from the user's profile
    user.avatar = undefined;
    await user.save();

    res.json({ message: "Avatar deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  uploadAvatar,
  getAvatar,
  updateAvatar,
  deleteAvatar,
};
