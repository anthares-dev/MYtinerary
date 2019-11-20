const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    default: "",
    unique: true
  },
  email: {
    type: String,
    default: "",
    unique: true
  },
  password: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

//database name is users - here I named it as singular of the database name

module.exports = mongoose.model("user", UserSchema);
