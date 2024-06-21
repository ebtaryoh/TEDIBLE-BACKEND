const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Restaurant name is required"] },
    imageUrl: { type: String, required: [true, "Image url is required"] },
    foods: { type: Array },
    time: { type: String },
    pickup: { type: Boolean, default: true },
    delivery: { type: Boolean, default: true },
    isOpen: { type: Boolean, default: true },
    logoUrl: { type: String },
    rating: { type: Number, default: 1, min: 1, max: 5 },
    ratingCount:{type:String}
  },

  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
