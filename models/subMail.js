// models/Subscriber.js
const mongoose = require("mongoose");
const validator = require("validator");

const subscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Subscribe", subscribeSchema);
