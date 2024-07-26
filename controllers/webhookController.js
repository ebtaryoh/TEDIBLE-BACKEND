const crypto = require("crypto");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

const handleWebhook = async (req, res) => {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
  
  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).json({ message: "Unauthorized request" });
  }

  const event = req.body;

  switch (event.event) {
    case 'charge.success':
      const paymentReference = event.data.reference;
      const userId = event.data.metadata.userId; // Ensure to pass userId in the metadata when initializing payment

      try {
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
        }

        const items = cart.items.map((item) => ({
          product: item.product._id,
          qty: item.qty,
          price: item.product.price,
        }));

        const order = new Order({
          user: userId,
          items,
          totalAmount: cart.totalAmount,
          status: "completed",
        });
        await order.save();

        await Cart.findByIdAndRemove(cart._id);

        res.status(200).json({ message: "Order placed successfully", order });
      } catch (error) {
        res.status(500).json({ message: "Error placing order", error: error.message });
      }
      break;
    
    default:
      res.status(200).json({ message: "Event received" });
      break;
  }
};

module.exports = { handleWebhook };
