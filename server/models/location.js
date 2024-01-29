const mongoose = require("mongoose");

const LocationObject = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  country: String,
  state: String
  // latlong: [Number],
});

// export default LocationObject;
module.exports = LocationObject;
// module.exports = mongoose.model("location", LocationSchema);
