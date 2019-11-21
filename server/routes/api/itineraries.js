const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

const itineraryModel = require("../../models/itineraryModel");

//* @route   GET api/itineraries
//* @desc    Get all Itineraries
//* @access  Public
// http://localhost:5000/itineraries/
router.get("/", (req, res) => {
  itineraryModel
    .find({})
    .then(itineraries => {
      res.send(itineraries);
    })
    .catch(err => console.log(err));
});

//* @route   GET api/itineraries/:city_id
//* @desc    Get itineraries per city
//* @access  Public
// http://localhost:5000/api/itineraries/:city_id
router.get("/:city_id", (req, res) => {
  let itineraryRequestedId = req.params.city_id;
  itineraryModel
    .find({ city_id: itineraryRequestedId })
    .then(itinerary => {
      res.send(itinerary);
    })
    .catch(err => console.log(err));
});

module.exports = router;
