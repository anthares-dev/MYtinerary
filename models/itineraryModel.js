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
  sub_title: {
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
  cost: {
    type: String,
    required: true
  },
  hashtags: {
    type: Array,
    required: true
  }
  /*
  activities: {
    type: Array,
    required: true
  }
  */
});

module.exports = mongoose.model("itinerary", itinerarySchema);
