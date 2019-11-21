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

app.use(cors());

//* Use Routers

app.use("/API/cities", require("./routes/API/cities"));

app.use("/API/itineraries", require("./routes/API/itineraries"));

app.use("/API/activities", require("./routes/API/activities"));

app.use("/API/users", require("./routes/API/users"));

app.use("/API/auth", require("./routes/API/auth"));
