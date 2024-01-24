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
const Story = require("./models/story");
const Comment = require("./models/comment");

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
  // console.log(req.user);
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
      res.send({ username: user.name });
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
      // For some reason, user._id gets set to 'new Object(user._id)'
      user.name = req.body.username;
      user.save();
      // console.log(user)
      socketManager.getSocketFromUserID(req.user._id).emit("username", user.username); // is this correct/necessary?
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

const myName = "Anonymous";

const data = {
  stories: [
    {
      _id: 0,
      creator_name: "Tony Cui",
      content: "Send it or blend it?",
      imgSrc: "XgbZdeA",
    },
    {
      _id: 1,
      creator_name: "Andrew Liu",
      content: "web.labing with Tony <3",
      imgSrc: "26xcQUF",
    },
  ],
  comments: [
    {
      _id: 0,
      creator_name: "Stanley Zhao",
      parent: 0,
      content: "Both!",
    },
  ],
};

router.get("/test", (req, res) => {
  res.send({ message: "Wow I made my first API! In its own file!" });
});

router.get("/stories", (req, res) => {
  // send back all of the stories!
  // res.send(data.stories);

  // empty selector means get all documents
  Story.find({}).then((stories) => res.send(stories));
});

router.get("/comment", (req, res) => {
  // const filteredComments = data.comments.filter((comment) => comment.parent == req.query.parent);
  // res.send(filteredComments);
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/story", (req, res) => {
  const newStory = new Story({
    // _id: data.stories.length,
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
    imgSrc: req.body.imgSrc,
  });

  newStory.save().then((story) => res.send(story));

  // data.stories.push(newStory);
  // res.send(newStory);
});

router.post("/comment", (req, res) => {
  console.log(req.body)
  // console.log(req.user)
  const newComment = new Comment({
    // _id: data.comments.length,
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent,
    content: req.body.content,
  });
  newComment.save().then((comment) => res.send(comment));

  // data.comments.push(newComment);
  // res.send(newComment);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
