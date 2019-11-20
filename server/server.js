//! EXPRESS:
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

//! MONGOOSE:
const mongoose = require("mongoose");
const config = require("config");
//* DB Config
const db = config.get("mongoURL");

//! middlewares:
const bodyParser = require("body-parser");
const cors = require("cors");

//* Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connection to Mongo DB established"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.use("/cities", require("./routes/cities"));

app.use("/itineraries", require("./routes/itineraries"));

app.use("/activities", require("./routes/activities"));

app.use("/users", require("./routes/users"));

app.use("/auth", require("./routes/auth"));

//MAIN:
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
