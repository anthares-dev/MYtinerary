const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  country: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: false
  }
  //versionKey: false ----> https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongoose
});

module.exports = mongoose.model("city", citySchema);
// named "city" as singular name of how the database is called
// if the database is not yet created in Mongo, It will be automatically created with name "cities" in the moment I post a new city
