const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const cityModel = require("../model/cityModel");

/*test*/
router.get("/test", (req, res) => {
  res.send({ msg: "Cities test route." });
});

/*get all cities*/
router.get("/all", auth, (req, res) => {
  cityModel
    .find({})
    .then(cities => {
      res.send(cities);
    })
    .catch(err => console.log(err));
});

//this is how I implement a city route by specific city
router.get("/:_id", (req, res) => {
  let cityRequested = req.params._id;
  cityModel
    .findOne({ _id: cityRequested })
    .then(city => {
      res.send(city);
    })
    .catch(err => console.log(err));
});

//this is how I implement a city route by specific city
router.get("/city/:name", (req, res) => {
  let cityRequested = req.params.name;
  cityModel
    .findOne({ name: cityRequested })
    .then(city => {
      res.send(city);
    })
    .catch(err => console.log(err));
});

/*create a route in cities*/
router.post("/", auth, (req, res) => {
  const newCity = new cityModel({
    name: req.body.name,
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
        .send("Server error - are you trying to add the same city?");
    });
});

module.exports = router;
