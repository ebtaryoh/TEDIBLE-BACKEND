const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
        priceCurrency: { type: String, default: "NGN" },
      },
    ],
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartItem", cartItemSchema);
