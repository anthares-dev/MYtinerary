const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
// for image upload https://www.youtube.com/watch?v=srPXMt1Q0nY
const multer = require("multer");

//* MULTER CONFIGURATION
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  console.log(file);

  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    console.log("ok");

    cb(null, true);
  } else {
    cb(new Error("You can upload only jpeg, jpg and png files"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // max 5 MB
  },
  fileFilter: fileFilter
});

//! following this video https://www.youtube.com/watch?v=USaB1adUHM0&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=9

//* User Model
const userModel = require("../../models/userModel");

// NORMAL REGISTER ROUTE

//* @route   POST api/users
//* @desc    Register new user (SIGN-UP)
//* @access  Public
// http://localhost:5000/api/users/

router.post("/", upload.single("userImage"), (req, res) => {
  //console.log("in");
  //console.log(req.name);
  //console.log(req.file.path);

  const { name, email, password, id, googleID } = req.body;
  const userImage = req.file.path;

  //* Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //* Check for existing user
  userModel.findOne({ email: email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new userModel({
      name,
      email,
      password,
      userImage
    });

    //* Create salt & hash, save in MongoDB and login
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            // onece registred, make the login
            { id: user._id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token: token,
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  userImage: "http://localhost:5000/" + user.userImage
                }
              });
            }
          );
        });
      });
    });
  });
});

//* @route   POST api/users/
//* @desc    Get all users (for POSTMAN)
//* @access  Public
// http://localhost:5000/api/users/

router.get("/", (req, res) => {
  userModel
    .find({})
    .then(users => {
      res.send(users);
    })
    .catch(err => console.log(err));
});

//* @route   GET api/users/:_id
//* @desc    Get a user per id (for POSTMAN)
//* @access  Public
// http://localhost:5000/api/users/:_id

router.get("/:_id", (req, res) => {
  userModel
    .findById(req.params._id)
    .then(user => {
      res.send(user);
    })
    .catch(err => console.log(err));
});

//* @route   DELETE api/users/:_id
//* @desc    Delete a user per id (for POSTMAN)
//* @access  Public
// http://localhost:5000/api/users/:_id
router.delete("/:_id", (req, res) => {
  userModel
    .findById(req.params._id)
    .then(user => {
      user.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ success: false }));
});

//! not working
//* @route   DELETE api/users/
//* @desc    Delete all users
//* @access  Public
// http://localhost:5000/api/users/
router.delete("/", (req, res) => {
  userModel
    .find({})
    .then(user => {
      user.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
