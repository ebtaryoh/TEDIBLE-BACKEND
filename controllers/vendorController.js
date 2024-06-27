const Vendor = require("../models/vendorModel");

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createVendor = async (req, res) => {
  const vendor = new Vendor({
    businessName: req.body.businessName,
    businessAddress: req.body.businessAddress,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    deliveryOption: req.body.deliveryOption,
    fullName: req.body.fullName,
    createPassword: req.body.createPassword,
    confirmPassword: req.body.confirmPassword,
  });
  try {
    const newVendor = await vendor.save();
    res.status(201).json(newVendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    vendor.businessName = req.body.businessName || vendor.businessName;
    vendor.businessAddress = req.body.address || vendor.businessAddress;
    vendor.phoneNumber = req.body.contactNumber || vendor.phoneNumber;
    vendor.email = req.body.email || vendor.email;

    const updatedVendor = await vendor.save();
    res.json(updatedVendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    await vendor.remove();
    res.json({ message: "Vendor deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
};
