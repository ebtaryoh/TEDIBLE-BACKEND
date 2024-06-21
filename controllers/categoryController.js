const Category = require("../models/categoryModel");
const createCategory = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res
        .status(500)
        .json({ message: "Please provide category title or image" });
    }
    const newCategory = new Category({ title, imageUrl });
    await newCategory.save();
    res
      .status(200)
      .json({ message: "New category has been created successfully" });
  } catch (error) {
    next(error);
  }
};

const allCategory = async (req, res, next) => {
  try {
    const category = await Category.find({});
    if (!category) {
      return res.status(404).json({ message: "Categories not found" });
    }
    res.status(200).json({
      totalCat: category.length,
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const category = await Category.findByIdAndUpdate(
      { _id: id },
      { title, imageUrl },
      { new: true }
    );
    if (!category) {
      return res.status(500).json({
        message: "No category found",
      });
    }
    if (!title) {
      return res
        .status(500)
        .json({ message: "Please provide category title or image" });
    }
    res.status(200).json({
      message: "Category updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).json({ message: "please provide a category ID" });
    }

    const category = await Category.findByIdAndDelete({ _id: id });
    try {
      if (!category) {
        return res
          .status(500)
          .json({ message: "No category found with this ID" });
      }
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: `No ID with ${_id}` });
    }
  } catch (error) {
    next;
  }
};

module.exports = {
  createCategory,
  allCategory,
  updateCategory,
  deleteCategory,
};
