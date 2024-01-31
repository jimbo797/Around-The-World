import React, { useEffect, useState } from "react";
import SingleStory from "./SinglePost.js";
import CommentsBlock from "./CommentsBlock.js";
import { get, post } from "../../utilities";

import "./Post.css";
import "./SavedPost.css";

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

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    unsaveTrip && unsaveTrip();
  };

  const unsaveTrip = () => {
    const body = { saveTripId: props._id };
    post("/api/unsavepost", body);
  };

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
