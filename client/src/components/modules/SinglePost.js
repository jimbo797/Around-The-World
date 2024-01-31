import React from "react";

import "../modules/Post.css";
import ImgurRequest from "./ImgurRequest";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} content of the story
 * @param {string} imgSrc imgur link
 */
const SingleStory = (props) => {
  let location;
  if (props.location) {
    const { name: city, state, country } = props.location;
    location = state ? `${city}, ${state}, ${country}` : `${city}, ${country}`;
  } else {
    location = "Location not specified";
  }

  return (
    <div className="Card-story">
      <div className="flex flex-col">
        <span className="u-bold black-text">{props.creator_name}</span>
        <span className="black-text">{location}</span>
      </div>
      <ImgurRequest imgId={props.imgSrc} />
      <p className="Card-storyContent">{props.content}</p>
    </div>
  );
};

export default SingleStory;
