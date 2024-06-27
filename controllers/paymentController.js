const axios = require("axios");
require("dotenv").config();

const PAYSTACK_BASE_URL = "https://api.paystack.co";

const initializePayment = async (req, res) => {
  const { name, email, address, phoneNumber, amount } = req.body;
  if (!name || !email || !address || !phoneNumber || !amount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const data = {
    name: name,
    email: email,
    address: address,
    phoneNumber: phoneNumber,
    amount: amount * 100,
  };

  const headers = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  try {
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

module.exports = {
  initializePayment,
};
