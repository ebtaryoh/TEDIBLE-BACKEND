const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    foods: [{ type: mongoose.Types.ObjectId, ref: "Food", required: true }],
    payment: {},
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed"],
      default: "pending",
    },
    qty: { type: Number, required: true, default: 1 },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
