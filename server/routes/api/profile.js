const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
// const passport = require("passport");
const auth = require("../../middlewares/auth");

const itineraryModel = require("../../models/itineraryModel");
const userModel = require("../../models/userModel");

//! GET FAV ITINERARIES //----------------------------------------------

//* @route   GET api/itineraries/:itin_id
//* @desc    Get itineraries per fav itin id
//* @access  Public
// http://localhost:5000/api/profile/itineraries/:itin_id
router.get("/itineraries/:user_id", (req, res) => {
  console.log("get user itin", req.params.user_id);

  userModel.findOne({ _id: req.params.user_id }).then(user => {
    if (user) {
      console.log("get user", user);
      itineraryModel
        .find({
          _id: { $in: user.favorites }
        })
        .then(itineraries => {
          res.send(itineraries);
        })
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
