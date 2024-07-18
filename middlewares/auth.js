const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith(`Bearer `)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

const isVendor = (req, res, next) => {
  const user = User.findById(req.user.userId);
  if (!user || user?.role !== "vendor") {
    return res.status(401).json({ message: "Vendors only" });
  }
  next();
};

module.exports = {auth, isVendor};
