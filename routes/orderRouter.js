const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  placeOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  initializePayment,
  verifyPayment,
} = require("../controllers/orderController");
const methodNotAllowed = require("../utils/methodNotAllowed");

const router = express.Router();

// Routes for orders
router
  .route("/")
  .post(auth, placeOrder)
  .get(auth, getOrders)
  .all(methodNotAllowed);

router
  .route("/:id")
  .get(auth, getOrderById)
  .put(auth, updateOrder)
  .delete(auth, deleteOrder)
  .all(methodNotAllowed);

router.route("/initialize").post(auth, initializePayment).all(methodNotAllowed);

router.route("/verify").post(auth, verifyPayment).all(methodNotAllowed);

module.exports = router;
