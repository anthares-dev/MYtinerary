const express = require("express");
const router = express.Router();

const activityModel = require("../../models/activityModel");

/*get all itineraries*/
router.get("/all", (req, res) => {
  activityModel
    .find({})
    .then(activity => {
      res.send(activity);
    })
    .catch(err => console.log(err));
});

/*
//this is how I implement a itin route by specific city
router.get("/:city_id", (req, res) => {
  let itineraryRequestedId = req.params.city_id;
  activityModel
    .findOne({ city_id: itineraryRequestedId })
    .then(activity => {
      res.send(activity);
    })
    .catch(err => console.log(err));
});
*/

module.exports = router;
