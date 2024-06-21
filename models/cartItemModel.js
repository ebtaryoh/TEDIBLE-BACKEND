const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  qty: { type: Number, required: true, default: 1 },
},
{ timestamps: true });

module.exports = mongoose.model("CartItem", cartItemSchema);
