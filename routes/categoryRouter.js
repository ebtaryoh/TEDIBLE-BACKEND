const express = require("express");
const auth = require("../middlewares/auth");
const {
  createCategory,
  allCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const methodNotAllowed = require("../utils/methodNotAllowed");

const router = express.Router();

router
  .route("/")
  .get(allCategory)
  .post(auth, createCategory)
  .all(methodNotAllowed);
router
  .route("/:id")
  .patch(auth, updateCategory)
  .delete(auth, deleteCategory)
  .all(methodNotAllowed);

module.exports = router;
