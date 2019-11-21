const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

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
// name if module is the singular of how the database is called
