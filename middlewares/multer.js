const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "food-products",
    allowedFormats: ["jpg", "png"],
  },
});

const upload = multer({ storage });

module.exports = upload;
