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
// http://localhost:5000/cities/

router.get("/", (req, res) => {
  //console.log("all");
  cityModel
    .find()
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
// example: http://localhost:5000/cities/5dc2e1781c9d440000f2d6b9

router.get("/:_id", (req, res) => {
  cityModel
    .findById(req.params._id)
    .then(city => {
      res.send(city);
    })
    .catch(err => console.log(err));
});

//* @route   GET api/cities/city/:name
//* @desc    Get city per Name
//* @access  Public
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

//* @route   POST api/cities
//* @desc    Create a city
//* @access  Public
// http://localhost:5000/cities/

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
      res.status(500).send(err.message);
    });
});

//* @route   DELETE api/cities/:id
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

/*
router.delete("/:_id", (req, res) => {
  cityModel.findById(req.params._id).then(city => {
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

*/

module.exports = router;
