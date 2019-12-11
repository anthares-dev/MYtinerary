const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  itinerary_id: String,
  user_id: String,
  name: String,
  avatar: String,
  text: String,
  timestamp: String
});

module.exports = mongoose.model("comment", CommentSchema);
