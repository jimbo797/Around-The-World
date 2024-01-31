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

require("dotenv").config();

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();
router.use(express.json());

//initialize socket
const socketManager = require("./server-socket");

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY;

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  res.send(req.user);
});

// router.get("/env", (req, res) => {
//   res.send(process.env);
// });

// router.get("/mapbox_token", (req, res) => res.send({token: process.env.MAPBOX_ACCESS_TOKEN}));

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));

  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPEN_AI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }],
    }),
  };
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", options);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

router.get("/user", (req, res) => {
  if (req.user) {
    User.findOne({ _id: req.user._id }).then((user) => {
      // findOne or findById ?
      res.send(user);
    });
  }
  res.send({});
});

router.get("/getUser", (req, res) => {
  if (req.query.userId) {
    User.findOne({ _id: req.query.userId }).then((user) => {
      res.send(user);
    });
  } else res.send({});
});

router.get("/getPostsByUser", (req, res) => {
  // TODO: Change so it accepts parameter for specific user in database, not just the current user
  if (req.user) {
    Story.find({ creator_id: req.user._id }).then((posts) => {
      res.send(posts);
    });
  } else res.send({});
});

router.get("/getUsername", (req, res) => {
  if (req.user) {
    User.findOne({ _id: req.user._id }).then((user) => {
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

router.get("/getBiography", (req, res) => {
  if (req.user) {
    User.findOne({ _id: req.user._id }).then((user) => {
      res.send({ biography: user.biography });
    });
  } else {
    res.send({});
  }
});

router.post("/changeUsername", (req, res) => {
  if (req.user) {
    User.findOne({ _id: req.user._id }).then((user) => {
      // For some reason, user._id gets set to 'new Object(user._id)'
      user.name = req.body.username;
      user.save();
      // socketManager.getSocketFromUserID(req.user._id).emit("username", user.username); // is this correct/necessary?
    });
    res.send({ message: "updated username" });
  }
});

router.post("/changeBiography", (req, res) => {
  if (req.user) {
    User.findOne({ _id: req.user._id }).then((user) => {
      user.biography = req.body.biography;
      user.save();
      // socketManager.getSocketFromUserID(req.user._id).emit("biography", user.biography);
    });
    res.send({ message: "updated biography" });
  }
});

router.post("/setProfilePicture", (req, res) => {
  if (req.user) {
    User.findById(req.user._id).then((user) => {
      user.profilePicture = req.body.profilePicture;
      user.save();
      // socketManager.getSocketFromUserID(req.user._id).emit("profilePicture", user.username);
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
  // let stories = [];

  // Story.find({}).then((stories) => res.send(stories));

  if (req.user) {
    User.findOne({ _id: req.user._id }).then((currUser) => {
      Story.find({ creator_id: { $in: currUser.following.concat(currUser._id) } }).then((stories) =>
        res.send(stories)
      );
    });
  }

  // Story.find({}).then((stories) => res.send(stories));
});

router.get("/mystories", (req, res) => {
  if (req.user) {
    User.findOne({ _id: req.user._id }).then((currUser) => {
      Story.find({ creator_id: currUser._id }).then((stories) => res.send(stories));
    });
  }
});

router.get("/savedtrips", (req, res) => {
  if (req.user) {
    User.findOne({ _id: req.user._id }).then((currUser) => {
      Story.find({ _id: { $in: currUser.savedTrips } }).then((stories) => res.send(stories));
    });
  }
});

router.get("/followed", (req, res) => {
  let final = [];

  if (req.user) {
    User.findOne({ _id: req.user._id }).then((currUser) => {
      let idFollowing = currUser.following;
      User.find({ _id: { $in: idFollowing } }).then((users) => res.send(users));
    });
  } else {
    res.send([]);
  }
});
router.get("/notfollowed", (req, res) => {
  let final = [];

  if (req.user) {
    User.findOne({ _id: req.user._id }).then((currUser) => {
      User.find({}).then((users) => {
        final = [...users];

        for (let followed of currUser.following) {
          final = final.filter((user) => String(user._id) !== followed);
        }
        final = final.filter((user) => String(user._id) !== String(currUser._id));
        res.send(final);
      });
    });
  } else {
    res.send([]);
  }
});

// router.get("/following", (req, res) => {
//   if (req.user) {
//     User.findOne({ name: req.user.name }).then((user) => {
//       user.following.push(req.body._id);
//       user.save();
//       socketManager.getSocketFromUserID(req.user._id).emit("follow", user.following);
//     });
//   // res.send(User.findOne({googleid: req.body.googleid}));
//     // res.send({message: req.body.googleid});
//     res.send({userid: req.body._id});
//   }
// });

router.get("/comment", (req, res) => {
  // const filteredComments = data.comments.filter((comment) => comment.parent == req.query.parent);
  // res.send(filteredComments);
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/story", (req, res) => {
  const newStory = new Story({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
    imgSrc: req.body.imgSrc,
    location: req.body.location,
  });

  if (req.user) {
    User.findOne({ _id: req.user._id }).then((user) => {
      user.locations.push(req.body.location.name);
      user.save();
    });
  }

  newStory.save().then((story) => res.send(story));
});

router.post("/savepost", (req, res) => {
  if (req.user) {
    User.findOne({ _id: req.user._id }).then((user) => {
      user.savedTrips.push(req.body.saveTripId);
      user.save();
    });
  }

  res.send({ saveTripId: req.body.saveTripId });
});

router.post("/unsavepost", (req, res) => {
  if (req.user) {
    User.findOne({ _id: req.user._id }).then((user) => {
      // let idFollowing = currUser.following;
      // User.find({_id: {$in: idFollowing}}).then((users) => res.send(users));
      user.savedTrips = user.savedTrips.filter((trip) => trip !== req.body.saveTripId);
      user.save();
    });
  }
});

router.get("/locations", (req, res) => {
  if (req.user) {
    User.findOne({ _id: req.user._id }).then((user) => {
      res.send({ locations: user.locations });
    });
  }
});

//       User.find({}).then((users) => {
//         final = [...users];

//         for (let followed of currUser.following) {
//           final = final.filter((user) => String(user._id) !== followed);
//         }
//         res.send(final);

//       });
//     })
// } else {
//   res.send([]);
// }

// Story.find({}).then((stories) => res.send(stories));

router.post("/setlocation", (req, res) => {
  if (req.user) {
    User.findOne({ _id: req.user._id }).then((user) => {
      user.locations.push(req.body.location);
      user.save();
    });
    res.send({ location: req.body.location });
  }
});

router.post("/follow", (req, res) => {
  if (req.user) {
    User.findOne({ _id: req.user._id }).then((user) => {
      user.following.push(req.body._id);
      user.save();
      // req.user.save();
      // socketManager.getSocketFromUserID(req.user._id).emit("follow", user.following);
    });
    // req.user.following.push(req.body._id);
    // req.user.save().then(() =>

    // res.send(User.findOne({googleid: req.body.googleid}));
    // res.send({message: req.body.googleid});
    res.send({ userid: req.body._id });
  }
});

router.post("/unfollow", (req, res) => {
  if (req.user) {
    User.findOne({ _id: req.user._id }).then((user) => {
      user.following = user.following.filter((item) => item !== req.body._id);
      user.save();
    });
    res.send({ userid: req.body._id });
  }
});

router.post("/comment", (req, res) => {
  const newComment = new Comment({
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
