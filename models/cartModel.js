const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
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
    totalAmount: { type: Number, required:true, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
