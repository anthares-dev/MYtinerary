const express = require("express");
const router = express.Router();

const cityModel = require("../model/cityModel");

/*test*/
router.get("/test", (req, res) => {
  res.send({ msg: "Cities test route." });
});

/*get all cities*/
router.get("/all", (req, res) => {
  cityModel
    .find({})
    .then(cities => {
      res.send(cities);
    })
    .catch(err => console.log(err));
});

/*create a route in cities*/
router.post("/", (req, res) => {
  const newCity = new cityModel({
    name: req.body.name,
    country: req.body.country
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
