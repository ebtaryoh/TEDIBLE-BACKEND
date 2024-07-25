const Product = require("../models/productModel");
const Rating = require("../models/ratingModel");

const submitRating = async (req, res) => {
  try {
    const { productId, rating } = req.body;

    if (!productId || !rating) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(400).json({ error: "Product doesn't exist" });
    }

    const newTotalRating = existingProduct.totalRatings + rating;
    const newNumberOfRatings = existingProduct.numberOfRatings + 1;
    const newRating = newTotalRating / newNumberOfRatings;

    existingProduct.totalRatings = newTotalRating;
    existingProduct.numberOfRatings = newNumberOfRatings;
    existingProduct.rating = newRating;

    await existingProduct.save();

    res.status(200).json({
      message: "Rating submitted",
      data: { product: existingProduct },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRatings = async (req, res) => {
  try {
    const { itemId } = req.params;

    const ratings = await Rating.find({ itemId });

    if (ratings.length === 0) {
      return res.status(404).json({ message: "No ratings found" });
    }

    const averageRating = ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length;

    res.status(200).json({ itemId, averageRating });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { submitRating, getRatings };
