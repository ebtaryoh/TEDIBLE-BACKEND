const Vendor = require("../models/vendorModel");

const bcryptjs = require("bcryptjs");

const signupVendor = async (req, res) => {
  try {
    const {
      businessName,
      businessAddress,
      phoneNumber,
      email,
      deliveryOptions,
      fullName,
      status,
      password,
      confirmPassword,
    } = req.body;

    const vendor = new Vendor({
      businessName,
      businessAddress,
      phoneNumber,
      email,
      deliveryOptions,
      fullName,
      status,
      password,
      confirmPassword,
    });

    await vendor.save();
    res.status(201).json({ message: "Vendor registered successfully", vendor });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginVendor = async (req, res, next) => {
  //   try {
  //     const { email, password } = req.body;
  //     const vendor = await Vendor.findOne({ email });

  //     if (!vendor) {
  //       return res.status(400).json({ message: "Invalid email or password" });
  //     }

  //     const isMatch = await vendor.comparePassword(password);
  //     if (!isMatch) {
  //       return res.status(400).json({ message: "Invalid email or password" });
  //     }

  //     res.json({ message: "Login successful", vendor });
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // };

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: `Invalid email or password` });
    }
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(401).json({ message: `Username is not registered` });
    }
    const isPasswordMatch = await bcryptjs.compare(password, vendor.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    res.status(200).json({
      message: "Login successful!",
    });
  } catch (error) {
    message: `Error in login`, next(error);
  }
};
const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcryptjs.hash(updates.password, 10);
    }
    const vendor = await Vendor.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json({ message: "Vendor updated successfully", vendor });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findByIdAndDelete(id);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupVendor, loginVendor, deleteVendor, updateVendor };
