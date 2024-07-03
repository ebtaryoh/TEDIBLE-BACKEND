const express = require("express");
const {
  updateVendor,
  deleteVendor,
  signupVendor,
  loginVendor,
} = require("../controllers/vendorController");
const methodNotAllowed = require("../utils/methodNotAllowed");
const router = express.Router();

router.route("/register").post(signupVendor).all(methodNotAllowed);
router.route("/login").post(loginVendor).all(methodNotAllowed);

router
  .route("/:id")
  .patch(updateVendor)
  .delete(deleteVendor)
  .all(methodNotAllowed);

module.exports = router;
