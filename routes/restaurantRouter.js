const express = require("express");
const auth = require("../middlewares/auth");
const methodNotAllowed = require("../utils/methodNotAllowed");
const {
  allRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  singleRestaurant,
} = require("../controllers/restaurantController");

const router = express.Router();

router
  .route("/")
  .get(allRestaurant)
  .post(auth, createRestaurant)
  .all(methodNotAllowed);
router
  .route("/:id")
  .get(singleRestaurant)
  .patch(auth, updateRestaurant)
  .delete(auth, deleteRestaurant)
  .all(methodNotAllowed);

module.exports = router;
