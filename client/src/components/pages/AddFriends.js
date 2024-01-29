import React, { useState, useEffect } from "react";
import Page from "../modules/Page";
import { get } from "../../utilities";
import AddUserProfile from "../modules/AddUserProfile";

const AddFriends = ({ userId }) => {
  const [users, setUsers] = useState([]);
  //   let usersCurrent = users;
  // let users = [];

  useEffect(() => {
    get("/api/notfollowed").then((userObjs) => {
      // setStories(storyObjs);
      //   users = userObjs;
      //   console.log(users);
      console.log(userObjs);
      setUsers(userObjs);
    //   console.log("here" + userObjs);
    });
  }, []);

  const followUser = (user) => {
    // console.log(storyObj.content + " " + storyObj._id);
    // console.log(typeof googleid);
    // for (let item of users) {
    //     console.log(item.googleid);
    //     console.log(typeof item.googleid);
    // }
    // googleid = String(googleid);
    // console.log(user);

    // console.log(users.filter(item => item._id !== userid.userid));
    // console.log(user.userid);
    // console.log(users[0]._id);
    setUsers(users.filter((item) => item._id !== user.userid));
    // // usersCurrent = users.filter(item => item._id !== userid.userid)
    // console.log(users);
  };

  // console.log(users);
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
    usersList = <div>No users to follow yet!</div>;
  }
  // console.log(usersList);

  return (
    <Page userId={userId}>
      <div className="overflow-scroll">
        {/* <NewStory addNewStory={addNewStory} /> */}
        {usersList}
      </div>
    </Page>
  );
};

export default AddFriends;
