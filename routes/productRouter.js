const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router
  .route("/")
  .get(getProducts)
  .post(upload.single("itemImage"), createProduct);

router
  .route("/:id")
  .put(upload.single("itemImage"), updateProduct)
  .delete(deleteProduct);

module.exports = router;
