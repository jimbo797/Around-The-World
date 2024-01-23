/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/user", (req, res) => {
  if (req.user) {
    User.findById(req.query.userid).then((user) => {
      res.send(user);
    });
  }
  res.send({});
});

router.get("/getUsername", (req, res) => {
  if (req.user) {
    User.findOne({ name: req.user.name }).then((user) => {
      res.send({ username: user.username });
    });
  } else {
    res.send({});
  }
});

router.get("/getProfilePicture", (req, res) => {
  if (req.user) {
    User.findById(req.query.userid).then((user) => {
      res.send({ profilePicture: user.profilePicture });
    });
  } else {
    res.send({});
  }
});

router.post("/changeUsername", (req, res) => {
  if (req.user) {
    User.findOne({ name: req.user.name }).then((user) => {
      user.username = req.body.username;
      user.save();
      socketManager.getSocketFromUserID(req.user._id).emit("username", user.username);
    });
    res.send({ message: "updated username" });
  }
});

router.post("/changeBiography", (req, res) => {
  if (req.user) {
    User.findOne({ name: req.user.name }).then((user) => {
      user.biography = req.body.biography;
      user.save();
      socketManager.getSocketFromUserID(req.user._id).emit("biography", user.biography);
    });
    res.send({ message: "updated biography" });
  }
});

router.post("/setProfilePicture", (req, res) => {
  if (req.user) {
    User.findById(req.query.userid).then((user) => {
      user.profilePicture = req.body.profilePicture;
      user.save();
      socketManager.getSocketFromUserID(req.user._id).emit("profilePicture", user.username);
    });
    res.send({ message: "updated profile picture" });
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
