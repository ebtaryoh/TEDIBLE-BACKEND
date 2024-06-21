const Order = require("../models/orderModel");

const placeOrder = async (req, res) => {
  try {
    const { cart, payment } = req.body;
    if (!cart || !payment) {
      return res
        .status(500)
        .json({ message: "Food cart of payment method required" });
    }
    const total = 0;
    cart.map((i) => {
      total += i.price;
    });
    const order = new Order({ foods: cart, payment, buyer: req.body.id });
    res.status(200).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error in placing API order" });
  }
};

module.exports = { placeOrder };
