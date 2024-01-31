import React, { useState, useEffect } from "react";
import Page from "../modules/Page";
import { get } from "../../utilities";
import AddUserProfile from "../modules/AddUserProfile";
import "./AddFriends.css";

const AddFriends = ({ userId }) => {
  const [users, setUsers] = useState([]);
  //   let usersCurrent = users;
  // let users = [];

  useEffect(() => {
    get("/api/notfollowed").then((userObjs) => {
      // setStories(storyObjs);
      //   users = userObjs;
      setUsers(userObjs);
    });
  }, []);

  const followUser = (user) => {
    // for (let item of users) {
    // }
    // googleid = String(googleid);

    setUsers(users.filter((item) => item._id !== user.userid));
    // // usersCurrent = users.filter(item => item._id !== userid.userid)
  };

  let usersList = null;
  const hasUsers = users.length !== 0;
  if (hasUsers) {
    usersList = users.map((userObj) => (
      <AddUserProfile
        key={`UserProfile_${userObj._id}`}
        _id={userObj._id}
        name={userObj.name}
        googleid={userObj.googleid}
        locations={userObj.locations}
        followUser={followUser}
      />
    ));
  } else {
    usersList = <div className="AddFriends-header">No users to follow yet, check back later!</div>;
  }

  return (
    <Page userId={userId}>
      <div className="overflow-scroll">
        {/* <NewStory addNewStory={addNewStory} /> */}
        <h1 className="AddFriends-header">Other Users</h1>
        {usersList}
      </div>
    </Page>
  );
};

export default AddFriends;
