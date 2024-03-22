const mongoose = require("mongoose");

const ImageDetailsSchema = new mongoose.Schema(
  {
    image: String,
    description: String,
    age: Number,
    color: String,
    gender: String
  },
  {
    collection: "ImageDetails" // Collection name in the database
  }
);

mongoose.model("ImageDetails", ImageDetailsSchema);
