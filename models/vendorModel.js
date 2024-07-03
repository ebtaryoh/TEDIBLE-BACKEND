const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const vendorSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
    },
    businessAddress: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    deliveryOptions: {
      pickup: {
        type: Boolean,
        default: true,
      },
      delivery: {
        type: Boolean,
        default: true,
      },
    },
    fullName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending"],
      default: "Pending",
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

vendorSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords do not match");
  }
  next();
});

vendorSchema.pre("save", function (next) {
  const vendor = this;

  if (!vendor.isModified("password")) return next();

  bcryptjs.hash(vendor.password, 10, (error, hash) => {
    if (error) return next(error);

    vendor.password = hash;
    vendor.confirmPassword = hash;
    next();
  });
});

vendorSchema.methods.comparePassword = async function (candidatePassword, cb) {
  return await bcryptjs.compare(
    candidatePassword,
    this.password,
    (error, isMatch) => {
      if (error) return cb(error);
      cb(null, isMatch);
    }
  );
};

module.exports = mongoose.model("Vendor", vendorSchema);
