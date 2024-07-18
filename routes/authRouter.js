const express = require("express");
const {
  loginUser,
  registerUser,
  deleteUser,
  resetPassword,
  forgotPassword,
} = require("../controllers/authController");
const methodNotAllowed = require("../utils/methodNotAllowed");
const { auth } = require("../middlewares/auth");
const router = express.Router();

// router.route("/").get(auth, getUser).all(methodNotAllowed);
router.route("/delete/:userId").delete(auth, deleteUser).all(methodNotAllowed);
router.route("/register").post(registerUser).all(methodNotAllowed);
router.route("/login").post(loginUser).all(methodNotAllowed);
router.route("/reset-password/:id").post(resetPassword).all(methodNotAllowed);
router.route("/forgot-password").post(forgotPassword).all(methodNotAllowed);

module.exports = router;
