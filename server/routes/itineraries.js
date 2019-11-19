const express = require("express");
const router = express.Router();

const itineraryModel = require("../model/itineraryModel");

/*get all itineraries*/
router.get("/all", (req, res) => {
  itineraryModel
    .find({})
    .then(itineraries => {
      res.send(itineraries);
    })
    .catch(err => console.log(err));
});

//this is how I implement a itin route by specific city
router.get("/:city_id", (req, res) => {
  let itineraryRequestedId = req.params.city_id;
  itineraryModel
    .findOne({ city_id: itineraryRequestedId })
    .then(itinerary => {
      res.send(itinerary);
    })
    .catch(err => console.log(err));
});

module.exports = router;
