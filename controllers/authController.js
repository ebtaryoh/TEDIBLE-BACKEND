const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/sendMail");
const { token } = require("morgan");
const crypto = require("crypto");
const dotenv = require("dotenv");

const registerUser = async (req, res, next) => {
  const { name, username, email, phone, password } = req.body;
  if (!name) {
    return res.status(400).json({ message: "please provide your full name" });
  }
  if (!username) {
    return res.status(400).json({ message: "please provide a username" });
  }
  if (!email) {
    return res.status(400).json({ message: "please provide an email address" });
  }
  if (!phone) {
    return res.status(400).json({ message: "please provide a phone number" });
  }
  if (!password) {
    return res.status(400).json({ message: "please provide a password" });
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(req.body.password, salt);
  try {
    const user = await User.create({ ...req.body, password: hashedPassword });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    const options = {
      email: email,
      subject: "Welcome to TEDIBLE",
      text: `Hi ${name}, Your registration is successful!. Thank you for choosing us, we wish you will enjoy our services`,
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
      return res.status(401).json({ message: `Invalid username or password` });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: `Username is not registered` });
    }
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.status(200).json({
      message: "Login successful!",
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    message: `Error in login`, next(error);
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });
  if (user) {
    await User.findByIdAndDelete({ _id: userId });
    res.status(200).json({ message: "user has been deleted successfuly" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

const forgotPassword = async (req, res, next) => {
  console.log("Request Body:", req.body); // Log request body for debugging
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

    const resetToken = user.generatePasswordResetToken();
    await user.save();

    const resetUrl = `http://localhost:${process.env.PORT}/api/auth/reset-password/${resetToken}`;
    const options = {
      email: email,
      subject: "ResetPassword",
      text: `This is the url to reset your password ${resetUrl}`,
    };
    try {
      await sendMail(options);

      res
        .status(200)
        .json({ message: "Password reset link sent to your email" });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      res.status(500).json({ message: "Error sending password reset email" });
    }
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    await sendResetEmail(user.email);

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

// const getUser = async (req, res) => {
//   const { userId } = req.user;
//   const user = await User.findOne({ _id: userId });
//   res.json({
//     user: {
//       name: user.name,
//       username: user.username,
//       email: user.email,
//       phone: user.phone,
//     },
//   });
// };

// const resetPassword = async (req, res, next) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (email !== user.email) {
//     return res.status(404).json({ message: `User not registered` });
//   }
//   const salt = await bcryptjs.genSalt(10);
//   const hashedPassword = await bcryptjs.hash(req.body.password, salt);
//   try {
//     const user = await User.create({ ...req.body, password: hashedPassword });

//     const secret = process.env.JWT_SECRET + user.password;
//     const payload = {
//       email: user.email,
//       userId: user._id,
//     };
//     const token = jwt.sign(payload, secret, {
//       expiresIn: "15m",
//     });
//     const link = `http://localhost:3000/reset-password/${user._id}/${token}`;
//     console.log(link);

//     sendMail(
//       email,
//       "Reset password link",
//       `http://localhost:3000/reset-password/${user._id}/${token}`
//     );
//     res.status(200).json({
//       message: `Password reset link has been sent to your email`,
//       token,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  forgotPassword,
  resetPassword,
};
