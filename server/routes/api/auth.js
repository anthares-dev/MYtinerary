const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middlewares/auth");
const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../../config");
const User = require("../../models/userModel");

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE.clientID,
      clientSecret: keys.GOOGLE.clientSecret,
      callbackURL: "/user/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(JSON.stringify(profile));
      console.log(JSON.stringify(profile.displayName));
      const newUser = new User({
        email: profile.emails[0].value,
        name: profile.displayName,
        userImage: profile.photos[0]
        // token: accessToken
      });

      return cb(null, newUser);
    }
  )
);

//! following this video https://www.youtube.com/watch?v=USaB1adUHM0&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=9

//* User Model
const User = require("../../models/userModel");

//* @route   POST /auth
//* @desc    Auth user (LOG-IN)
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

//* @route   GET /auth/google
//* @desc    Auth user data with Google
router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//* @desc    Callback route for google to redirect to
router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    console.log(res);

    // Successful authentication, redirect home.
    res.redirect("/");
    // res.redirect("/profile");
  }
);

/*
app.get("/user", (req, res) => {
  console.log("getting user data!");
  res.send(user);
});

app.get("/auth/logout", (req, res) => {
  console.log("logging out!");
  user = {};
  res.redirect("/");
});
*/
module.exports = router;
