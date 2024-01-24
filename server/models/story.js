const mongoose = require("mongoose");

// const LocationSchema = new mongoose.Schema({
//   latitude: String,
//   longitude: String
// });

//define a story schema for the database
const StorySchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  content: String,
  imgSrc: String,
  // location: LocationSchema,
  // comments: [String],
});

// compile model from schema
module.exports = mongoose.model("story", StorySchema);
