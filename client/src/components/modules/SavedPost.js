import React, { useEffect, useState } from "react";
import SingleStory from "./SinglePost.js";
import CommentsBlock from "./CommentsBlock.js";
import { get, post } from "../../utilities";

import "./Post.css";
import "./SavedPost.css"

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} content of the story
 * @param {string} imgSrc imgur link
 */
const SavedPost = (props) => {
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

//   const [saved, setSaved] = useState("Save Trip")

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    unsaveTrip && unsaveTrip();
    // setSaved("Trip Saved");
  };

  const unsaveTrip = () => {
    const body = { saveTripId: props._id };
    post("/api/unsavepost", body);
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
        className="NewPostInput-button u-pointer SavedPost-button"
        // value={saved}
        onClick={handleSubmit}
      >
        Unsave Trip
      </button>

        </div>
      <CommentsBlock story={props} comments={comments} addNewComment={addNewComment} />
    </div>
  );
};

export default SavedPost;