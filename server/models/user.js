const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  biography : String,
  // profilePicture: String,
  stories : [String],
  locations: [String],
  following: [String]
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
