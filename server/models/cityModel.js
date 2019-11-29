//! model of my resource/collection "cities" so that we may ensure some sort of structure for the documents in our database collection.
/*The first property of the object is the “type” which defines which type of data our server can expect to receive when we send our request for the respective property of our schema.*/
/*The next property of the object is the “required” field which is a boolean we set to true. This way our admin will also receive an error if they leave an input on our form blank. */

const mongoose = require("mongoose");

// creating a new istance 
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
