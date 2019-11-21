const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//! following this video https://www.youtube.com/watch?v=USaB1adUHM0&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=9

//* User Model
const User = require("../../models/userModel");

//* @route   POST /users
//* @desc    Register new user
//* @access  Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //* Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //* Check for existing user
  User.findOne({ email: email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password
    });

    //* Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token: token,
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

// http://localhost:5000/users

/*get all users*/
/*
router.get("/all", (req, res) => {
  userModel
    .find({})
    .then(users => {
      res.send(users);
    })
    .catch(err => console.log(err));
});
*/

/*
router.post("/", (req, res, next) => {
  const { body } = req;

  const { userName, email, password } = body;

  if (!userName) {
    return res.end({
      success: false,
      message: "Error: Username cannot be blank."
    });
  }
  if (!email) {
    return res.end({
      success: false,
      message: "Error: Email cannot be blank."
    });
  }
  if (!password) {
    return res.end({
      success: false,
      message: "Error: Passoword cannot be blank."
    });
  }

  console.log("here");

  email = email.toLowerCase();

  // Steps:
  // 1. Verify email doens't exist
  // 2. Save
  User.find(
    {
      email: email
    },
    (err, previousUsers) => {
      if (err) {
        return res.end({
          succcess: false,
          message: "Error: Server error"
        });
      } else if (previousUsers.length > 0) {
        return res.end({
          succcess: false,
          message: "Error: Account already exist"
        });
      }

      // Save the new user
      const newUser = new User();

      newUser.email = email;
      newUser.userName = userName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.end({
            succcess: false,
            message: "Error: Server error"
          });
        }
        return res.end({
          succcess: true,
          message: "Signed up"
        });
      });
    }
  );
});
*/

module.exports = router;
