const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

//const itineraryModel = require("../../models/itineraryModel");
const commentsModel = require("../../models/commentsModel");

//!GET

// @route GET api/comments/
// @desc  Get All Comments
// @access Public

router.get("/", (req, res) => {
  commentsModel.find().then(comment => res.json(comment));
});

// @route GET api/comments/:itin_id
// @desc  Get comment by itinerary
// @access Public

router.get("/:itinerary_id", (req, res) => {
  commentsModel
    .find({ itinerary_id: req.params.itinerary_id })
    .then(comment => res.json(comment));
});

// @route GET api/commentid/:ID
// @desc  Get comment by ID
// @access Public
/*
router.get("/commentid/:id", (req, res) => {
  // console.log(req.params.id);
  Commentmodel.findById(req.params.id).then(comment => res.json(comment));
});
*/

//!POST

// @route   POST api/comments
// @desc    Create comment
// @access  Public

router.post("/", (req, res) => {
  const newComment = new commentsModel({
    itinerary_id: req.body.itinerary_id,
    user_id: req.body.user_id,
    name: req.body.name,
    avatar: req.body.avatar,
    text: req.body.text,
    timestamp: req.body.timestamp
  });

  newComment
    .save()
    .then(comment => {
      // console.log(doc);
      res.json(comment);
    })
    .catch(err => {
      console.error(err);
    });
});

//* @route   DELETE api/comments/:comment_id
//* @desc    Delete a comment per ID
//* @access  Public
router.delete("/:comment_id", (req, res) => {
  commentsModel
    .findById(req.params.comment_id)
    .then(comment => {
      comment.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ success: false }));
});
// http://localhost:5000/api/cities/:_id

module.exports = router;
