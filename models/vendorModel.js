const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Please provide a name"] },
  message: { type: String, required: [true, "Please input a message"] },
  //   createdBy: {type: mongoose.Types.ObjectId,
  //     ref:"User",
  //     required: true
  //   }
});

module.exports = mongoose.model("Vendor", vendorSchema);
