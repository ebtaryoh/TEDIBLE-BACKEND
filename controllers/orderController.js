const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const axios = require("axios");
require("dotenv").config();

const PAYSTACK_BASE_URL = "https://api.paystack.co";

const placeOrder = async (req, res) => {
  const { userId, paymentReference } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const headers = {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    };

    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${paymentReference}`,
      { headers }
    );

    if (response.data.data.status !== "success") {
      return res.status(400).json({ message: "Payment not successful" });
    }

    const order = new Order({
      user: userId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      paymentStatus: "Completed",
    });
    await order.save();

    await Cart.findByIdAndRemove(cart._id);

    res.status(200).json({ message: "Order placed successfully", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
  }
};

module.exports = { placeOrder };
