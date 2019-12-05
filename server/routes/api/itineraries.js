const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

const itineraryModel = require("../../models/itineraryModel");
const userModel = require("../../models/userModel");

//! ITINERARIES GET //----------------------------------------------

//* @route   GET api/itineraries/
//* @desc    Get all Itineraries
//* @access  Public
// http://localhost:5000/api/itineraries/
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

//! FAVORITES' ITINERARIES ADD //----------------------------------------------

//* @route   POST /api/itineraries/favorites/:user_id/:itin_id
//* @desc    Add to Favorites in User Profile
//* @access  Private

router.post("/favorites/:user_id/:itin_id", (req, res) => {
  userModel
    .findOneAndUpdate(
      { _id: req.params.user_id },
      // { $push: { favorites: "req.body.favData" } }
      { $push: { favorites: req.params.itin_id } }
      // { new: true }
    )
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ success: false }));
});

//! FAVORITES' ITINERARIES DELETE //----------------------------------------------

//* @route   DELETE /api/itineraries/favorites/:user_id/:itin_id
//* @desc    Delete to Favorites in User Profile
//* @access  Private

router.delete("/favorites/:user_id/:itin_id", (req, res) => {
  userModel
    .findOneAndUpdate(
      { _id: req.params.user_id },
      // { $push: { favorites: "req.body.favData" } }
      { $pull: { favorites: req.params.itin_id } }
      // { new: true }
    )
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
