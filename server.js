//! My entry point and the file executed by the backend server.
require("dotenv").config();
const express = require("express"); //? web application framework for Node.js and designed to build web applications and APIs
const app = express();

//* middlewares: are used to do something before a request is processed
const bodyParser = require("body-parser"); // I want the form data to be available in req.body https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90

const passport = require("passport");
require("./config/passport");
app.use(passport.initialize());
//app.use(passport.session());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const cors = require("cors");
app.use(cors()); // policy set up on the server that allows to serve third party origins

const mongoose = require("mongoose"); //? library to help me manage my data structures and interactions in MongoDB
const db = process.env.MONGO_URI; // taking key from .env file inside config folder
const config = require("config"); //
//const db = require("./keys").MONGO_URI;

//* Connecting to Mongo:
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connection to Mongo DB established"))
  .catch(err => console.log(err));

app.use("*/uploads", express.static("uploads"));

//* Using Routers defined in ./routes/api/
//? app.use("api route", require("realtive path to the file where the route methods are defined"))

app.use("/api/cities", require("./routes/api/cities"));

app.use("/api/itineraries", require("./routes/api/itineraries"));
//app.use("/api/itineraries/:city_id", require("./routes/api/itineraries"));

app.use("/api/activities", require("./routes/api/activities"));

app.use("/api/users", require("./routes/api/users"));

app.use("/api/profile", require("./routes/api/profile"));

app.use("/api/comments", require("./routes/api/comments"));

const path = require("path");

//* Serve static assets if in production
// https://www.youtube.com/watch?v=71wSzpLyW9k

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
/*
When hosting my application on another service (like Heroku, Nodejitsu, and AWS),
my host may independently configure the process.env.PORT variable for me;
after all, my script runs in their environment.
So process.env.PORT || 5000 means: whatever is in the environment variable PORT, or 5000 if there's nothing there.
*/

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
