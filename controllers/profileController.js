const User = require("../models/userModel");

exports.uploadAvatar = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image file." });
    }

    const avatarUrl = req.file.path; // Cloudinary URL

    // Update the user's avatar in the database
    await User.updateAvatar(userId, avatarUrl);

    res.json({ message: "Avatar uploaded successfully!", avatarUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvatar = async (req, res) => {
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

exports.updateAvatar = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image file." });
    }

    const avatarUrl = req.file.path; // Cloudinary URL

    // Update the user's avatar in the database
    await User.updateAvatar(userId, avatarUrl);

    res.json({ message: "Avatar updated successfully!", avatarUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAvatar = async (req, res) => {
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
