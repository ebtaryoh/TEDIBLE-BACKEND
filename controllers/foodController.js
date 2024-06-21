const Food = require("../models/foodModel");

const allFoods = async (req, res) => {
  const { userId } = req.user;
  try {
    const food = await Food.find({ createdBy: userId });
    res.json({ data: food });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const singleFood = async (req, res) => {
  const { userId } = req.user;
  try {
    const { id } = req.params;
    const food = await Food.findOne({ _id: id, createdBy: userId });

    res.json({ data: food });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createFood = async (req, res, next) => {
  const {
    name,
    description,
    price,
    imageUrl,
    foodTags,
    isAvailable,
    rating,
    restaurant,
  } = req.body;
  if (!name || !description || !price || !imageUrl || !restaurant) {
    return res.status(500).json({ message: "Please provide all fields" });
  }
  try {
    const food = await Food.create({
      ...req.body,
    });
    res
      .status(200)
      .json({ message: "Food item created successfully!!!", food });
    await food.save();
  } catch (error) {
    next(error);
  }
};

const updateFood = async (req, res) => {
  const { userId } = req.user;

  const { id } = req.params;
  const food = await Food.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { ...req.body }
  );
  try {
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteFood = async (req, res) => {
  const { userId } = req.user;

  const { id } = req.params;
  const food = await Food.findOneAndDelete({
    _id: id,
    createdBy: userId,
  });
  try {
    res.status(200).json({ message: "Deleted Successfully!" });
  } catch (error) {
    res.status(404).json({ id: `No ID with ${id}` });
  }
};

module.exports = {
  allFoods,
  singleFood,
  createFood,
  updateFood,
  deleteFood,
};
