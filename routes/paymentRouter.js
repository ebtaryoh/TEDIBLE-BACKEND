const express = require("express");
const { initializePayment } = require("../controllers/paymentController");
const methodNotAllowed = require("../utils/methodNotAllowed");

const router = express.Router();

router.route("/").post(initializePayment).all(methodNotAllowed);

module.exports = router;
