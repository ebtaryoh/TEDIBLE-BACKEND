const Product = require("../models/productModel");
const cloudinary = require("../utils/cloudinary");

const createProduct = async (req, res) => {
  try {
    const {
      itemName,
      price,
      promotionalOffer,
      category,
      subCategory,
      tags,
      vendor,
    } = req.body;

    // Ensure req.file exists to avoid errors
    if (!req.file) {
      return res.status(400).json({ error: "Product image is required" });
    }

    const itemImage = req.file.path;

    // Check required fields
    if (!itemName || !price || !category || !subCategory || !vendor) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    // Check user role
    if (req.user.role !== "vendor") {
      return res.status(401).json({
        message: `User ${req.user.id} is not authorized to create product`,
      });
    }

    const product = new Product({
      itemName,
      itemImage,
      price,
      promotionalOffer,
      category,
      subCategory,
      tags: tags.split(","), // Ensure tags is an array
      vendor: req.user.userId,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const { category, subCategory } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;

    const products = await Product.find(filter).populate(
      "vendor",
      "name email phone"
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      itemName,
      price,
      promotionalOffer,
      category,
      subCategory,
      tags,
      vendor,
    } = req.body;

    let itemImage;

    if (req.file) {
      const product = await Product.findById(id);
      if (product) {
        await cloudinary.uploader.destroy(product.itemImage);
        itemImage = req.file.path;
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        itemName,
        itemImage,
        price,
        promotionalOffer,
        category,
        subCategory,
        tags: tags ? tags.split(",") : undefined,
        vendor,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product) {
      await cloudinary.uploader.destroy(product.itemImage);
      await product.remove();
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
