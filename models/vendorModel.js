const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  businessName: { type: String, required: [true, "Please provide a business name"] },
  nameOfContactPerson: { type: String, required: [true, "Please provide a contact person name"] },
  businessAddress: { type: String, required: [true, "Please provide a business address"] },
  phoneNumber: { type: Number, required: [true, "Please provide a phone number"] },
 email: { type: String, required: [true, "Please provide an email"] },
 operatingHours: [
  {
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true
    },
    open: {
      type: String,
      required: true
    },
    close: {
      type: String,
      required: true
    }}],
      cuisineType: { type: String, required: [true, "Please provide a cuisine type"] },
      username:{type:String, required: [true, "Please provide a username"]},
      password:{type:String, required: [true, "Please provide a password"]},
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model("Vendor", vendorSchema);
