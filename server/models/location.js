const mongoose = require("mongoose");

export const LocationObject = new mongoose.Schema({
  name: String,
  latlong: [Number],
});

// export default LocationObject;
// module.exports = LocationObject;
// module.exports = mongoose.model("location", LocationSchema);
