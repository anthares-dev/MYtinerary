const mongoose = require("mongoose");
// var ObjectId = mongoose.Schema.Types.ObjectId;

const itinerarySchema = new mongoose.Schema({
  city_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  profile_name: {
    type: String,
    required: true
  },
  profile_img: {
    type: String
  },
  likes: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  hashtags: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model("itinerary", itinerarySchema);
