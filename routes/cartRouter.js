const express = require("express");
const router = express.Router();
const {
  createCart,
  getCart,
  updateCart,
  deleteCart,
  initializePayment,
  verifyPayment,
} = require("../controllers/cartController");
const methodNotAllowed = require("../utils/methodNotAllowed");

router.route("/").post(createCart).put(updateCart).all(methodNotAllowed)

router.route("/:userId").get(getCart).all(methodNotAllowed)

router.route("/:cartId").delete(deleteCart).all(methodNotAllowed)

router.route("/payments/initialize").post(initializePayment).all(methodNotAllowed)

router.route("/payments/verify/:reference").get(verifyPayment).all(methodNotAllowed)

module.exports = router;
