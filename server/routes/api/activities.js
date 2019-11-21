const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

const activityModel = require("../../models/activityModel");

//* @route   GET api/activities
//* @desc    Get all Activities
//* @access  Public
// http://localhost:5000/activities/

router.get("/", (req, res) => {
  activityModel
    .find({})
    .then(activity => {
      res.send(activity);
    })
    .catch(err => console.log(err));
});

module.exports = router;
