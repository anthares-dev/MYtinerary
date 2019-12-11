const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  // _id: ObjectId,
  auth: {
    register_date: {
      type: Date,
      default: Date.now
    },
    provider: String,
    local: {
      name: {
        type: String
      },
      email: {
        type: String
      },
      password: {
        type: String
      },
      avatar: {
        type: String
      }
    },
    google: {
      g_id: {
        type: String
      },
      email: {
        type: String
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      }
    }
  },
  favorites: { type: Array }
});

//database name is users - here I named it as singular of the database name
module.exports = mongoose.model("user", UserSchema);
