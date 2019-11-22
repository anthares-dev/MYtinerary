const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middlewares/auth");

//! following this video https://www.youtube.com/watch?v=USaB1adUHM0&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=9

//* User Model
const User = require("../../models/userModel");

//* @route   POST /auth
//* @desc    Auth user
//* @access  Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //* Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //* Check for existing user
  User.findOne({ email: email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    //* Validate password

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

//* @route   GET /auth/user
//* @desc    Auth user data
//* @access  Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password, -__v")
    .then(user => res.json(user));
});

module.exports = router;
