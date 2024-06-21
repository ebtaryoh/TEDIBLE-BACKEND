const express = require("express");

const {
  allFoods,
  createFood,
  singleFood,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");
const methodNotAllowed = require("../utils/methodNotAllowed");
const auth = require("../middlewares/auth");
const router = express.Router();

router
  .route("/")
  .get(auth, allFoods)
  .post(auth, createFood)
  .all(methodNotAllowed);
router
  .route("/:id")
  .get(auth, singleFood)
  .patch(auth, updateFood)
  .delete(auth, deleteFood)
  .all(methodNotAllowed);

module.exports = router;
