const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const axios = require("axios");
require("dotenv").config();

const PAYSTACK_BASE_URL = "https://api.paystack.co";

// Place an order (with payment verification)
const placeOrder = async (req, res) => {
  const { userId, paymentReference } = req.body;

  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${paymentReference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.data.status !== "success") {
      return res.status(400).json({ message: "Payment not successful" });
    }

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const order = new Order({
      user: userId,
      product: cart.items.map(item => item.product),
      qty: cart.items.reduce((total, item) => total + item.qty, 0),
      amount: cart.totalAmount,
      status: "completed",
    });
    await order.save();

    await Cart.findByIdAndRemove(cart._id);

    res.status(200).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};

// Other CRUD functions...

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("product").populate("user");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("product").populate("user");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const initializePayment = async (req, res) => {
  const { email, amount } = req.body;

  try {
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      { email, amount: amount * 100 },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { paymentReference } = req.body;

  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${paymentReference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  initializePayment,
  verifyPayment,
};
