// EXPRESS:
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// MONGOOSE:
const mongoose = require("mongoose");
const db = require("./keys").mongoURI;

// middlewares:
const bodyParser = require("body-parser");
const cors = require("cors");

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

//MAIN:
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

app.use("/cities", require("./routes/cities"));
