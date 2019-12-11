const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // for hashing the plain password
const jwt = require("jsonwebtoken"); //  Jason Web Token
const config = require("config"); // for taking keys from config folder
const multer = require("multer");
const auth = require("../../middlewares/auth"); // for making the calls private
const passport = require("passport");
//const keys = require("../../config/keys");

const userModel = require("../../models/userModel"); // loading userModel

//! REGISTER USER LOCAL
//* MULTER CONFIGURATION for Image Upload
// https://www.youtube.com/watch?v=srPXMt1Q0nY

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
    console.log("file type accepted");

    cb(null, true);
  } else {
    cb(new Error("You can upload only jpeg, jpg or png files"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // max 5 MB
  },
  fileFilter: fileFilter
});

// following this video https://www.youtube.com/watch?v=USaB1adUHM0&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=9

//* @route   POST api/users
//* @desc    Register new user (SIGN-UP)
//* @access  Public
// http://localhost:5000/api/users/

router.post("/", upload.single("avatar"), (req, res) => {
  //console.log("in");
  //console.log(req.name);
  //console.log(req.file.path);

  const { name, email, password } = req.body; //? for getting data from the body

  if (req.file.path !== null) {
    var avatar = req.file.path;
  } else {
  }

  //* Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //* Check for existing user (using mongoose findOne)
  userModel.findOne({ "auth.local.email": email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    // if user doesnìt exist, then create a new user
    const newUser = new userModel({
      "auth.provider": "local",
      "auth.local.name": name,
      "auth.local.email": email,
      "auth.local.password": password, //? the password is plain and need to be hashed before sending it to database
      "auth.local.avatar": avatar
    });

    //* Create salt & hash, create JWT (Jason Web Token), save all in MongoDB and Sing In the new user
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.auth.local.password, salt, (err, hash) => {
        //take the plain password newUser.password and pass to salt
        if (err) throw err;
        newUser.auth.local.password = hash;
        newUser.save().then(user => {
          // creating and assigning the token
          jwt.sign(
            { id: user._id }, // payload we want to add to the token - better the ID then other sensitives informations https://jwt.io/
            process.env.JWT_SECRET, // taking the keys from default.json
            { expiresIn: 3600 }, // 1 hour
            (err, token) => {
              if (err) throw err;
              console.log("new user created: ", user);

              res.json({
                // our response that will showed in our state under auth
                token: token,
                user: {
                  provider: "local",
                  id: user._id,
                  name: user.auth.local.name,
                  email: user.auth.local.email,
                  password: user.auth.local.password,
                  avatar: user.auth.local.avatar,
                  favorites: user.favorites
                }
              });
            }
          );
        });
      });
    });
  });
});

//! GOOGLE authentication
// https://medium.com/@melikalbasi/how-to-implement-passport-with-google-in-your-mern-stack-app-8c2171717d86
// the routes to get the request form the client and authenticate though Google using Passport
//* @route   GET /api/users/auth/google
//* @desc    Auth with Google
//* @access  Private
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    let token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h"
    });
    // res.redirect(`http://localhost:3000/?token=${token}`);
    res.redirect(`/?token=${token}`);
  }
);

//! LOGIN USER LOCAL
//* @route   POST api/users/auth
//* @desc    Auth user (LOG-IN)
//* @access  Public
router.post("/auth", (req, res) => {
  const { email, password } = req.body;

  //* Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //* Check for existing user (if find the email but user is different)
  userModel.findOne({ "auth.local.email": email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    //* Validate password (comparing the plain text password and the hashed one)
    bcrypt.compare(password, user.auth.local.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
      // if match then create a token
      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              provider: "local",
              name: user.auth.local.name,
              email: user.auth.local.email,
              password: user.auth.local.password,
              avatar: user.auth.local.avatar,
              favorites: user.favorites
            }
          });
        }
      );
    });
  });
});

//! loading user (local or google)
// Check for the current user: get the current user's data by using the token.
/* We need a way to constantly valide the token because jwt is stateless, cannot using sessions,
 not storing data, just sending code, decoding and sending the response.*/
//* @route   GET /api/users/auth/user
//* @desc    Auth user data
//* @access  Private
router.get("/auth/user", auth, (req, res) => {
  userModel
    .findById(req.user.id)
    .select("-password") // not returning the password
    .then(user => {
      console.log("user loaded", user);
      console.log(user.auth.provider);

      if (user.auth.provider == "local") {
        jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                provider: "local",
                name: user.auth.local.name,
                email: user.auth.local.email,
                avatar: user.auth.local.avatar,
                favorites: user.favorites
              }
            }); // sending the user minus the pass
          }
        );
      } else {
        jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                provider: "google",
                name: user.auth.google.name,
                email: user.auth.google.email,
                avatar: user.auth.google.avatar,
                favorites: user.favorites
              }
            }); // sending the user minus the pass
          }
        );
      }
    });
});

//! this part is not for application purpouses but for tests in POSTMAN

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
//* @desc    Delete all users (for POSTMAN)
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
