const Restaurant = require("../models/restaurantModel");

const createRestaurant = async (req, res) => {
  try {
    const {
      name,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
    } = req.body;
    if (!name || !imageUrl) {
      return res
        .status(500)
        .json({ message: "Please provide Restaurant name or imageUrl" });
    }
    const newRestaurant = new Restaurant({
      name,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
    });
    await newRestaurant.save();
    res.status(201).json({ message: "New restaurant created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in creating API" });
  }
};
const allRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    if (!restaurants) {
      return res.status(404).json({ message: "No restaurant available" });
    }
    res.status(200).json({ totalCount: restaurants.length, restaurants });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getting all Restaurant API", error });
  }
};
const singleRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById({ _id: id });
    if (!restaurant) {
      return res.status(404).json({ message: "No restaurant found" });
    }
    res.status(200).json({ restaurant });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getting restaurant by ID", error });
  }
};
const updateRestaurant = async (req, res) => {};
const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOneAndDelete({ _id: id });
    if (!restaurant) {
      return res
        .status(404)
        .json({ message: "No restaurant found with this ID" });
    }
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in deleting Restaurant API", error });
  }
};

module.exports = {
  createRestaurant,
  singleRestaurant,
  allRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
