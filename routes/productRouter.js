const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const methodNotAllowed = require("../utils/methodNotAllowed");

router
  .route("/")
  .get(getProducts)
  .post(upload.single("itemImage"), createProduct) // Removed auth middleware
  .all(methodNotAllowed);

router
  .route("/:id")
  .put(upload.single("itemImage"), updateProduct) // Removed auth middleware
  .delete(deleteProduct) // Removed auth middleware
  .all(methodNotAllowed);

module.exports = router;
