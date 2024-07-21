const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { auth, isVendor } = require("../middlewares/auth");
const methodNotAllowed = require("../utils/methodNotAllowed");

router
  .route("/")
  .get(getProducts)
  .post(upload.single("itemImage"), auth, isVendor, createProduct).all(methodNotAllowed)

router
  .route("/:id")
  .put(upload.single("itemImage"), updateProduct)
  .delete(deleteProduct)
  .all(methodNotAllowed);

module.exports = router;
