import React, { useEffect, useState } from "react";
import SingleStory from "./SinglePost.js";
import CommentsBlock from "./CommentsBlock.js";
import { get, post } from "../../utilities.js";

import "./Post.css";
import "./UnsavedPost.css"

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} content of the story
 * @param {string} imgSrc imgur link
 */
const UnsavedPost = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    get("/api/comment", { parent: props._id }).then((comments) => {
      setComments(comments);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewComment = (commentObj) => {
    setComments(comments.concat([commentObj]));
  };

  const [saved, setSaved] = useState("Save Trip");

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    saveTrip && saveTrip();
    setSaved("Trip Saved");
    alert("Trip saved successfully!");
  };

  const saveTrip = () => {
    const body = { saveTripId: props._id };
    post("/api/savepost", body);
    // .then((comment) => {
    //   // display this comment on the screen
    //   props.addNewComment(comment);
    // });
  };

  // router.post("/savepost", (req, res) => {
  //   if (req.user){
  //     User.findOne({_id: req.user._id}).then((user) => {
  //       user.savedTrips.push(req.body.saveTripId);
  //       user.save();
  //     })
  //   }

  //   res.send({saveTripId: req.body.saveTripId});
  // })

  return (
    <div className="Card-container">
      <div className="UnsavedPost-size">
      <SingleStory
        _id={props._id}
        creator_name={props.creator_name}
        content={props.content}
        imgSrc={props.imgSrc}
        location={props.location}
      />
      <button
        type="submit"
        className="NewPostInput-button u-pointer UnsavedPost-button"
        value={saved}
        onClick={handleSubmit}
      >
        Save Trip
      </button>
      </div>
      
      <CommentsBlock story={props} comments={comments} addNewComment={addNewComment} />
    </div>
  );
};

export default UnsavedPost;
