const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  itemId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
});

module.exports = mongoose.model("Rating", ratingSchema);
