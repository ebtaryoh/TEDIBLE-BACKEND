const Rating = require("../models/ratingModel");

const submitRating = async (req, res) => {
  try {
    const { itemId, userId, rating } = req.body;

    // Validate input
    if (!itemId || !userId || !rating) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const existingRating = await Rating.findOne({ itemId });
    if (existingRating) {
      return res.status(400).json({ error: "itemId already exists" });
    }

    // Check if the user has already rated the item
    let userRating = await Rating.findOne({ itemId, userId });
    if (userRating) {
      // Update existing rating
      userRating.rating = rating;
      await userRating.save();
    } else {
      // Create a new rating
      userRating = new Rating({ itemId, userId, rating });
      await userRating.save();
    }

    res.status(200).json({ message: "Rating submitted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRatings = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Fetch all ratings for the item
    const ratings = await Rating.find({ itemId });

    if (ratings.length === 0) {
      return res.status(404).json({ message: "No ratings found" });
    }

    // Calculate average rating
    const averageRating =
      ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length;

    res.status(200).json({ itemId, averageRating });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { submitRating, getRatings };
