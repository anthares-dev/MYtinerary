//!  predefined CRUD operations related to collection type "cities" in my database MongoDB 

const express = require("express");
const router = express.Router();

const cityModel = require("../../models/cityModel");
const auth = require("../../middlewares/auth");

//* @route   GET api/cities/test (api/cities is defined in server.js app.use("/api/cities", ...)
//* @desc    Test connectivity
//* @access  Public
router.get("/test", (req, res) => {
  res.send({ msg: "Cities test route." }); //In our response object we send back a simple string in JSON format.
});
/*
We pass two arguments into our get method.
The path and a callback function with our
request object and response object as parameters. 
*/
/*
Since we made the call to app.use() in our server.js file we only need to pass
in “/test” as our first argument here, 
owever this refers to the endpoint “localhost:5000/api/cities/test”.
*/

//* @route   GET api/cities/
//* @desc    Get all Cities
//* @access  Public
// http://localhost:5000/api/cities/

router.get("/", (req, res) => {
  //console.log("all");
  cityModel
    .find({}) // if I want to search for a specific city
    .sort({}) // I can decide if sort cities
    .then(cities => {
      //console.log(cities);
      res.send(cities);
    })
    .catch(err => console.log(err));
});

//* @route   GET api/cities/:_id
//* @desc    Get city per ID
//* @access  Public
// http://localhost:5000/api/cities/:_id
// example: http://localhost:5000/api/cities/5dc2e1781c9d440000f2d6b9

router.get("/:_id", (req, res) => {
  cityModel
    .findById(req.params._id)
    .then(city => {
      res.send(city);
    })
    .catch(err => console.log(err));
});

/*
// @route   GET api/cities/city/:name
// @desc    Get city per Name
// @access  Public
// http://localhost:5000/cities/city/:name
// example: http://localhost:5000/cities/city/Barcelona
router.get("/city/:name", (req, res) => {
  let cityRequested = req.params.name;
  cityModel
    .findOne({ name: cityRequested })
    .then(city => {
      res.send(city);
    })
    .catch(err => console.log(err));
});
*/

//* @route   POST api/cities/
//* @desc    Create a city
//* @access  Public
// http://localhost:5000/api/cities/

router.post("/", (req, res) => {
  const newCity = new cityModel({ // creating a new istance of my City model
    name: req.body.name, // the name comes from the request of the body
    country: req.body.country,
    img: req.body.img
  });
  newCity
    .save()
    .then(city => {
      res.send(city);
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
});

//* @route   DELETE api/cities/:_id
//* @desc    Delete a city per ID
//* @access  Public
router.delete("/:_id", (req, res) => {
  cityModel
    .findById(req.params._id)
    .then(city => {
      city.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ success: false }));
});
// http://localhost:5000/api/cities/:_id

module.exports = router;
