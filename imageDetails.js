const mongoose = require('mongoose');

// Define the schema for the ImageDetails model
const imageDetailsSchema = new mongoose.Schema({
  imageUrl: String,
  description: String,
  age: String,
  color: String,
  gender: String,
});

// Export the schema
module.exports = imageDetailsSchema;


