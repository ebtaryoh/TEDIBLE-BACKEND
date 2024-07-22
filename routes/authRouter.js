const express = require("express");

const profileController = require("../controllers/profileController");
const methodNotAllowed = require("../utils/methodNotAllowed");
const { auth } = require("../middlewares/auth");
const upload = require("../middlewares/multer");
const { registerUser, loginUser, deleteUser, forgotPassword, resetPassword } = require("../controllers/authController");
const router = express.Router();

// User authentication routes
router.route("/register").post(registerUser).all(methodNotAllowed);
router.route("/login").post(loginUser).all(methodNotAllowed);
router.route("/delete/:userId").delete(auth, deleteUser).all(methodNotAllowed);
router.route("/forgot-password").post(forgotPassword).all(methodNotAllowed);
router.route("/reset-password/:id").post(resetPassword).all(methodNotAllowed);

// Avatar management routes
router.route("/upload-avatar")
  .post(auth, upload.single('avatar'), profileController.uploadAvatar).all(methodNotAllowed);

router.route("/:userId/avatar")
  .get(auth, profileController.getAvatar).all(methodNotAllowed);

router.route("/update-avatar")
  .put(auth, upload.single('avatar'), profileController.updateAvatar).all(methodNotAllowed);

router.route("/delete-avatar")
  .delete(auth, profileController.deleteAvatar).all(methodNotAllowed);

module.exports = router;
