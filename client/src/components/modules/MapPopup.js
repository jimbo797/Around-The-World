import React from "react";

import UnsavedPost from "./UnsavedPost";

import "./MapPopup.css";

const MapPopup = ({ posts, handleExit }) => {
  let postList;
  postList = posts.map((post) => (
    <UnsavedPost
      key={`Card_${post._id}`}
      _id={post._id}
      creator_name={post.creator_name}
      content={post.content}
      imgSrc={post.imgSrc}
      location={post.location}
    />
  ));

  return (
    <div className="popup flex flex-col">
      <div className="flex flex-row justify-center">
        <button
          className="box-border flex justify-center bg-gray-600 w-11/12 mb-0"
          onClick={handleExit}
        >
          Back to Map
        </button>
      </div>
      <div className="pt-0 p-5">{postList}</div>
    </div>
  );
};

export default MapPopup;
