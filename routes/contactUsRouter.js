const express = require("express");
const contactUsLogic = require("../controllers/contactUsController");
const methodNotAllowed = require("../utils/methodNotAllowed");
const router = express.Router();

router.route("/").post(contactUsLogic).all(methodNotAllowed);

module.exports = router;
