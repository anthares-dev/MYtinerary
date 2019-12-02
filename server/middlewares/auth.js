//! This middleware is necessary cause we want a private route as long we have the token
//! we can use this middleware in order to protect some api routes/ calls
// (min 35) https://www.youtube.com/watch?v=USaB1adUHM0&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=9

const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token"); // get the token from the header

  //* Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" }); //401 status: Unautharized

  //* If there is the token, then verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret")); // we need to take the user id from the token
    //* Add user from payload
    req.user = decoded;
    next(); // passing to the next piece of middleware, in this case no other one
  } catch (e) {
    req.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
