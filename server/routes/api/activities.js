const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

const activityModel = require("../../models/activityModel");

//* @route   GET api/activities/
//* @desc    Get all Activities
//* @access  Public
// http://localhost:5000/api/activities/

router.get("/", (req, res) => {
  activityModel
    .find({})
    .then(activity => {
      res.send(activity);
    })
    .catch(err => console.log(err));
});

//* @route   GET api/activities/:city_id
//* @desc    Get activities per city_id
//* @access  Public
// http://localhost:5000/api/activities/:city_id

router.get("/:city_id", (req, res) => {
  let itineraryRequestedId = req.params.city_id;
  activityModel
    .find({ city_id: itineraryRequestedId })
    .then(activity => {
      res.send(activity);
    })
    .catch(err => console.log(err));
});

module.exports = router;
