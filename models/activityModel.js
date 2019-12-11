const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  city_id: {
    type: String,
    required: true
  },
  itinerary_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

//name if module is the singular of how the database is called
module.exports = mongoose.model("activity", activitySchema);
