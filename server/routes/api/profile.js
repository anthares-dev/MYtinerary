const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
// const passport = require("passport");
const auth = require("../../middlewares/auth");

//  Load User model
const userModel = require("../../models/userModel");
const itinerarymodel = require("../../models/itineraryModel");
/*
//! GET USER INFO //----------------------------------------------

//* @route   GET /api/users/:_id
//* @desc    Get profile by user ID
//* @access  Public

router.get("/:user_id", (req, res) => {
  userModel
    .findById(req.params.user_id) // (req.params._id)
    .select("-password") // not returning the password
    .then(user => {
      console.log("user loaded", user);
      console.log(user.favorites);
    });
});

//! FAVORITE DELETE //----------------------------------------------

//* @route   DELETE /api/users/profile/favorite
//* @desc    Delete Favorite from User
//* @access  Private

router.delete("/profile/favorite", (req, res) => {
  userModel
    .findOneAndUpdate(
      { _id: req.body.id },
      // { $push: { favorites: "req.body.favData" } }
      { $pull: { favorites: req.body.itinerary_id } }
      // { new: true }
    )
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ success: false }));
});

//-------------------------------------------------------------
// FAVORITE DELETE

// @route   DELETE auth/profile/removefav/:id/:favid
// @desc    Delete Favorite from User
// @access  Private
/*
router.delete(
  "/profile/removefav/:id/:favid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { favorites: req.params.favid } }
      // { new: true }
    )
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(404).json({ success: false }));
  }
);
*/
module.exports = router;
