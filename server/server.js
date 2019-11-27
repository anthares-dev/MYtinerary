//! EXPRESS:
const express = require("express");
const app = express();

//! middlewares:
//* Body parser middleware
const bodyParser = require("body-parser");
const cors = require("cors");

//! MONGOOSE:
const mongoose = require("mongoose");
const config = require("config");
//* DB Config
const db = config.get("mongoURI");
//const db = require("./keys").mongoURI;

//* Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connection to Mongo DB established"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/uploads", express.static("uploads"));

app.use(cors());

//* Use Routers

app.use("/api/cities", require("./routes/api/cities"));

app.use("/api/itineraries", require("./routes/api/itineraries"));

app.use("/api/itineraries/:city_id", require("./routes/api/itineraries"));

app.use("/api/activities", require("./routes/api/activities"));

app.use("/api/users", require("./routes/api/users"));

app.use("/api/auth", require("./routes/api/auth"));
