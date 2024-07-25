const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { auth } = require("../middlewares/auth");
const methodNotAllowed = require("../utils/methodNotAllowed");

router
  .route("/")
  .get(getProducts)
  .post(auth, upload.single("itemImage"), createProduct)
  .all(methodNotAllowed);

router
  .route("/:id")
  .put(auth, upload.single("itemImage"), updateProduct)
  .delete(auth, deleteProduct)
  .all(methodNotAllowed);

module.exports = router;
