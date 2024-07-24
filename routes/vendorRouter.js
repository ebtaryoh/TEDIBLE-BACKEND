const express = require("express");
const {
  updateVendor,
  deleteVendor,
  signupVendor,
  loginVendor,
  getVendor,
} = require("../controllers/vendorController");
const auth  = require("../middlewares/auth");
const methodNotAllowed = require("../utils/methodNotAllowed");
const router = express.Router();

// Public routes
router.route("/register").post(signupVendor).all(methodNotAllowed);
router.route("/login").post(loginVendor).all(methodNotAllowed);

// Protected routes

router
  .route("/:id")
  .get(getVendor) // New route for getting a vendor
  .patch(updateVendor)
  .delete(deleteVendor)
  .all(methodNotAllowed);

module.exports = router;
