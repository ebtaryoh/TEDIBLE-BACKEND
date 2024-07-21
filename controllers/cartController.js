const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const axios = require("axios");
require("dotenv").config();

const PAYSTACK_BASE_URL = "https://api.paystack.co";

const createCart = async (req, res) => {
  const { userId, items } = req.body;

  try {
    let totalAmount = 0;
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      item.price = product.price;
      totalAmount += product.price * item.qty;
    }

    const cart = new Cart({ user: userId, items, totalAmount });
    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating cart", error: error.message });
  }
};

const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving cart", error: error.message });
  }
};

const updateCart = async (req, res) => {
  const { cartId, items } = req.body;

  try {
    let cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    let totalAmount = 0;
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      item.price = product.price;
      totalAmount += product.price * item.qty;
    }

    cart.items = items;
    cart.totalAmount = totalAmount;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cart", error: error.message });
  }
};

const deleteCart = async (req, res) => {
  const { cartId } = req.params;

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    await cart.remove();
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting cart", error: error.message });
  }
};

const initializePayment = async (req, res) => {
  const { userId, email } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const data = {
      email: email,
      amount: cart.totalAmount * 100,
    };

    const headers = {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      data,
      { headers }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error initializing payment",
      error: error.response ? error.response.data : error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.data.status === "success") {
      // Payment was successful, you can now clear the cart or mark the order as paid
      res.status(200).json({
        status: "success",
        data: response.data.data,
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "Payment not successful",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error verifying payment",
      error: error.response ? error.response.data : error.message,
    });
  }
};

module.exports = {
  createCart,
  getCart,
  updateCart,
  deleteCart,
  initializePayment,
  verifyPayment,
};
