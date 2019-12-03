const mongoose = require("mongoose");
// var ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  id: String,
  auth: {
    local: {
      name: {
        type: String
      },
      email: {
        type: String,
        unique: false
      },
      password: {
        type: String
      },
      userImage: {
        type: String
      },
      register_date: {
        type: Date,
        default: Date.now
      }
    },
    google: {
      id: {
        type: String
      },
      token: {
        type: String
      },
      email: {
        type: String
      },
      name: {
        type: String
      },
      image: {
        type: String
      },
      register_date: {
        type: Date,
        default: Date.now
      }
    }
  }
});

//database name is users - here I named it as singular of the database name
module.exports = mongoose.model("user", UserSchema);
