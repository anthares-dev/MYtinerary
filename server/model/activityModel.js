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
  title: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }

  //versionKey: false ----> https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongoose
});

//name if module is the singular of how the database is called
module.exports = mongoose.model("activity", activitySchema);
