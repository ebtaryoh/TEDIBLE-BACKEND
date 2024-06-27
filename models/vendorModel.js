const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: [true, "Please provide a business name"],
    },
    // nameOfContactPerson: {
    //   type: String,
    //   required: [true, "Please provide a contact person name"],
    // },
    businessAddress: {
      type: String,
      required: [true, "Please provide a business address"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please provide a phone number"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    deliveryOption: { enum: ["In house delivery", "pickup"] },
    // operatingHours: [
    //   {
    //     day: {
    //       type: String,
    //       enum: [
    //         "Monday",
    //         "Tuesday",
    //         "Wednesday",
    //         "Thursday",
    //         "Friday",
    //         "Saturday",
    //         "Sunday",
    //       ],
    //       required: true,
    //     },
    //     open: {
    //       type: String,
    //       required: true,
    //     },
    //     close: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
    // cuisineType: {
    //   type: String,
    //   required: [true, "Please provide a cuisine type"],
    // },
    fullName: {
      type: String,
      required: [true, "Please provide your full name"],
      unique: true,
    },
    createPassword: {
      type: String,
      required: [true, "Please provide a password"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Please provide a password"],
    },
  },

  { timestamps: true }
);

vendorSchema.pre("save", function (next) {
  const vendor = this;

  if (!vendor.isModified("password")) return next();

  bcrypt.hash(vendor.password, 10, (error, hash) => {
    if (error) return next(error);

    vendor.password = hash;
    vendor.confirmPassword = hash; 
    next();
  });
});

vendorSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords do not match");
  }
  next();
});

vendorSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
    if (error) return cb(error);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("Vendor", vendorSchema);
