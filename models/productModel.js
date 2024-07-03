const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: [true, "Product name is required"] },
    itemImage: { type: String, required: true },
    promotionalOffer: { type: Number, default: 0 },

    category: {
      type: String,
      enum: ["Rice", "Burger", "Swallow", "Pizza", "Chicken", "Drinks"],
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    price: { type: Number, required: [true, "Product price is required"] },
    priceCurrency: { type: String, default: "NGN" },
    tags: { type: [String], required: true },

   
    vendor: {
      type: mongoose.Types.ObjectId,
      ref: "Vendor",
      required: [true, "Vendor ID is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
