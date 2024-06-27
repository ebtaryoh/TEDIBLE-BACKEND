const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Food name is required"] },

    description: {
      type: String,
      required: [true, "Food description is required"],
    },
    price: { type: Number, required: [true, "Food price is required"] },
    priceCurrency: { type: String, default: "NGN" },
    imageUrl: { type: String, required: [true, "please provide an image Url"] },
    foodTags: { type: String },
    isAvailable: { type: Boolean, default: true },

    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
