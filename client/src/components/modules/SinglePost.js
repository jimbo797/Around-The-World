import React from "react";

import "../modules/Post.css";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} content of the story
//  * @param {string} imgSrc imgur link
 */
const SingleStory = (props) => {
  return (
    <div className="Card-story">
      <span className="u-bold">{props.creator_name}</span>
      {/* <p className="Card-storyContent">{props.imgSrc}</p> */}
      <p className="Card-storyContent">{props.content}</p>
    </div>
  );
};

export default SingleStory;