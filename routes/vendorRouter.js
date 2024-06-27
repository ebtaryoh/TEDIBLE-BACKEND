const express = require("express");
const {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} = require("../controllers/vendorController");
const methodNotAllowed = require("../utils/methodNotAllowed");
const router = express.Router();

router.route("/").get(getAllVendors).post(createVendor).all(methodNotAllowed);
router
  .route("/:id")
  .get(getVendorById)
  .patch(updateVendor)
  .delete(deleteVendor)
  .all(methodNotAllowed);

module.exports = router;
