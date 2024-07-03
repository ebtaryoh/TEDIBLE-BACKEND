const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: [true, "Food name is required"] },
      itemImage: { type: String, required: true },

    category: {
      type: String,
      enum: ["Rice", "Burger", "Swallow", "Pizza", "Chicken", "Drinks"],
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    price: { type: Number, required: [true, "Food price is required"] },
    priceCurrency: { type: String, default: "NGN" },
    tags: [{ type: String }],
    // imageUrl: { type: String, required: [true, "please provide an image Url"] },
    foodTags: { type: String },
    // isAvailable: { type: Boolean, default: true },

    vendor: {
      type: mongoose.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// // Define the schema for food products
// const foodProductSchema = new Schema({
//   itemName: { type: String, required: true },
//   price: { type: Number, required: true },

//   subCategory: {
//     type: String,
//     required: true
//   },
//   tags: [{ type: String }]
// });

// // Create the model from the schema
// const FoodProduct = mongoose.model('FoodProduct', foodProductSchema);

// module.exports = FoodProduct;
