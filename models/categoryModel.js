const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "category title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=http%3A%2F%2Ft2.gstatic.com%2Flicensed-image%3Fq%3Dtbn%3AANd9GcRRto3IlY56MlAIOAvXHvPEVxBDVzG1uz1zULEBYdJ-I4Aa-xOyPEVvv7fmIjLnxaOz&psig=AOvVaw1zTFjQ3jdmCCvYIlmJgGSS&ust=1718296718961000&source=images&cd=vfe&opi=89978449&ved=0CAoQjRxqFwoTCJDegJ7A1oYDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
