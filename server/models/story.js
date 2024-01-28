const mongoose = require("mongoose");
// const LocationObject = require("./location");
import { LocationObject } from "./location";

// const LocationSchema = new mongoose.Schema({
//   name: String,
//   latitude: Number,
//   longitude: Number,
// });

//define a story schema for the database
const StorySchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  content: String,
  imgSrc: String,
  location: LocationObject,
  // comments: [String],
});

// compile model from schema
module.exports = mongoose.model("story", StorySchema);
