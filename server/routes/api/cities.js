const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

//* City Model
const cityModel = require("../../models/cityModel");

/*test*/
router.get("/test", (req, res) => {
  res.send({ msg: "Cities test route." });
});

//* @route   GET api/cities
//* @desc    Get all Cities
//* @access  Public
router.get("/", (req, res) => {
  //console.log("all");
  cityModel
    .find()
    .sort({}) // I can decide if sort cities
    .then(cities => {
      console.log(cities);

      res.send(cities);
    })
    .catch(err => console.log(err));
});

// http://localhost:5000/cities/all

//* @route   GET /:_id
//* @desc    City per ID
//* @access  Public
router.get("/:_id", (req, res) => {
  let cityRequested = req.params._id;
  cityModel
    .findOne({ _id: cityRequested })
    .then(city => {
      res.send(city);
    })
    .catch(err => console.log(err));
});

// http://localhost:5000/cities/_id
// example: http://localhost:5000/cities/5dc2e1781c9d440000f2d6b9

//* @route   GET /city/:name
//* @desc    City per Name
//* @access  Public
router.get("/city/:name", (req, res) => {
  let cityRequested = req.params.name;
  cityModel
    .findOne({ name: cityRequested })
    .then(city => {
      res.send(city);
    })
    .catch(err => console.log(err));
});

// http://localhost:5000/cities/city/name
// example: http://localhost:5000/cities/city/Barcelona

//* @route   POST api/cities
//* @desc    Create a city
//* @access  Public
router.post("/", (req, res) => {
  const newCity = new cityModel({
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
      res
        .status(500)
        .send("Server error - maybe are you trying to add the same city?");
    });
});

//* @route   DELETE /:_id
//* @desc    Delete a city per ID
//* @access  Private
router.delete("/:_id", auth, (req, res) => {
  let cityRequested = req.params._id;
  cityModel.findOne({ _id: cityRequested }).then(city => {
    if (!city) {
      return res.status(404).send("City not found");
    }
    city.remove().then(err => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(202).send("city deleted");
      }
    });
  });
});

module.exports = router;
