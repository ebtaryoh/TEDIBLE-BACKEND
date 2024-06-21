const express = require("express");
const auth = require("../middlewares/auth");
const { placeOrder } = require("../controllers/orderController");
const methodNotAllowed = require("../utils/methodNotAllowed");

const router = express.Router();

router.route("/").post(auth, placeOrder).all(methodNotAllowed);

module.exports = router;
