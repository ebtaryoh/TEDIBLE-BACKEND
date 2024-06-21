const Subscribe = require("../utils/subMail");

subscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const existingSubscription = await Subscribe.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ message: "Email is already subscribed" });
    }
    const subscribe = new Subscribe({ email });
    await subscription.save();
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Unsubscribe from the newsletter
unsubscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const subscribe = await Subscribe.findOneAndDelete({ email });
    if (!subscription) {
      return res.status(404).json({ message: "Email not found" });
    }
    res.status(200).json({ message: "Unsubscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {subscribe, unsubscribe};
