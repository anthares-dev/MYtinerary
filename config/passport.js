var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("../models/userModel"); // loading userModel
const jwt = require("jsonwebtoken"); //  Jason Web Token
const config = require("config");
require("dotenv").config();

/*
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  userModel.findById(id).then(user => {
    done(null, user);
  });
});
*/

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

console.log("secret", process.env.GOOGLE_CLIENT_ID);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile.emails[0].value);

      //check if user already exist on the database
      userModel
        .findOne({ "auth.google.g_id": profile.id })
        .then(currentUser => {
          if (currentUser) {
            //already have the user saved in google, update it if there are changes
            userModel
              .findOneAndUpdate(
                { "auth.google.g_id": profile.id },
                {
                  "auth.google.email": profile.emails[0].value,
                  "auth.google.name": profile.displayName,
                  "auth.google.avatar": profile.photos[0].value
                }
              )
              .then(currentUser => {
                console.log("google user already exist");
                console.log("user is: ", currentUser);
                done(null, currentUser);
              });
          } else {
            userModel
              .findOne({ "auth.local.email": profile.emails[0].value })
              .then(currentUser => {
                //already have the user logged in with local before, so update the google part
                if (currentUser) {
                  userModel
                    .findOneAndUpdate(
                      { "auth.local.email": profile.emails[0].value },
                      {
                        "auth.google.g_id": profile.id,
                        "auth.google.email": profile.emails[0].value,
                        "auth.google.name": profile.displayName,
                        "auth.google.avatar": profile.photos[0].value
                      }
                    )
                    .then(updatedUser => {
                      console.log("user updated: ", updatedUser);
                      done(null, updatedUser);
                    });
                } else {
                  console.log("3", profile);
                  //if first time signing up, create new User and put it on the db
                  const newUser = new userModel({
                    "auth.provider": "google",
                    "auth.google.g_id": profile.id,
                    "auth.google.name": profile.displayName,
                    "auth.google.email": profile.emails[0].value,
                    "auth.google.avatar": profile.photos[0].value
                  });
                  // console.log("secret", config.get("JWT_SECRET"));

                  newUser
                    .save()
                    .then(user => {
                      console.log("new user created: ", user);

                      jwt.sign(
                        { id: user._id }, // payload we want to add to the token - better the ID then other sensitives informations https://jwt.io/
                        process.env.JWT_SECRET, // taking the keys from default.json
                        { expiresIn: 3600 }, // 1 hour
                        (err, token) => {
                          if (err) throw err;
                          res.json({
                            // our response that will showed in our state under auth
                            token: token,
                            user: {
                              provider: "google",
                              g_id: user.auth.google.g_id,
                              id: user.id,
                              name: user.auth.google.name,
                              email: user.auth.google.email,
                              avatar: user.auth.google.image,
                              favorites: user.favorites
                            }
                          });
                        }
                      );

                      done(null, user);
                    })
                    .catch(err => {
                      done(err, null);
                    });
                }
              });
          }
        });
    }
  )
);
