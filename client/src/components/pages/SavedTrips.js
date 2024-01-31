import React from "react";
import { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";
import Page from "../modules/Page";
import SavedPost from "../modules/SavedPost.js";

const SavedTrips = ({ userId }) => {
  // displaying saved posts
  const [stories, setStories] = useState([]);

  useEffect(() => {
    get("/api/savedTrips").then((storyObjs) => {
      let reversedStoryObjs = storyObjs.reverse();
      setStories(reversedStoryObjs);
    });
  }, [stories]);

  let storiesList = null;
  const hasStories = stories.length !== 0;
  if (hasStories) {
    storiesList = stories.map((storyObj) => (
      <SavedPost
        key={`Card_${storyObj._id}`}
        _id={storyObj._id}
        creator_name={storyObj.creator_name}
        content={storyObj.content}
        imgSrc={storyObj.imgSrc}
        location={storyObj.location}
      />
    ));
  } else {
    storiesList = <div>No saved stories!</div>;
  }

  return (
    <Page userId={userId}>
      <div>{storiesList}</div>
    </Page>
  );
};

export default SavedTrips;
