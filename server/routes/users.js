const express = require("express");
const router = express.Router();

const userModel = require("../model/userModel");

/*get all users*/
router.get("/all", (req, res) => {
  userModel
    .find({})
    .then(users => {
      res.send(users);
    })
    .catch(err => console.log(err));
});

/*create a route in users*/
router.post("/", (req, res) => {
  const newUser = new userModel({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    image: req.body.image
  });
  newUser
    .save()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res
        .status(500)
        .send("Server error - are you trying to add the same city?");
    });
});

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
