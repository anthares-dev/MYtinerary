const mongoose = require("mongoose");

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
  //versionKey: false ----> https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongoose
});

//name if module is the singular of how the database is called
module.exports = mongoose.model("itinerary", itinerarySchema);
