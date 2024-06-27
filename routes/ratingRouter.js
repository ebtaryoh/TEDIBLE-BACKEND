const express = require("express");
const { submitRating, getRatings } = require("../controllers/ratingController");
const methodNotAllowed = require("../utils/methodNotAllowed");
const router = express.Router();

router.route("/").post(submitRating).all(methodNotAllowed);
router.get("/:itemId", getRatings);

module.exports = router;
