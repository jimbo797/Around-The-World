import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import Card from "../modules/Post.js";
import { NewStory } from "../modules/NewPostInput.js";
import Page from "../modules/Page";
import "../modules/Page.css";
import LogIn from "../modules/LogIn";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

const Feed = ({userId, handleLogin, handleLogout}) => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    get("/api/stories").then((storyObjs) => {
      // setStories(storyObjs);
      let reversedStoryObjs = storyObjs.reverse();
      setStories(reversedStoryObjs);
    });
  }, [stories]);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewStory = (storyObj) => {
    console.log(storyObj.content + " " + storyObj._id);
    setStories(stories.concat([storyObj]));
  };

  let storiesList = null;
  const hasStories = stories.length !== 0;
  if (hasStories) {
    storiesList = stories.map((storyObj) => (
      <Card
        key={`Card_${storyObj._id}`}
        _id={storyObj._id}
        creator_name={storyObj.creator_name}
        content={storyObj.content}
        imgSrc={storyObj.imgSrc}
      />
    ));
  } else {
    storiesList = <div>No stories!</div>;
  }

  return (
    <Page userId={userId}>
    <div>
      {/* {!userId ? (
        <LogIn userId={userId} handleLogin={handleLogin} handleLogout={handleLogout}></LogIn>
      ):( */}
        <div className="overflow-scroll">
        <NewStory addNewStory={addNewStory} />
        {storiesList}
        </div>
      {/* )} */}
    </div>
    </Page>
  );
};

export default Feed;