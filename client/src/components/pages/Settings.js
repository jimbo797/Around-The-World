import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import Page from "../modules/Page";
import LogIn from "../modules/LogIn";

import { get, post } from "../../utilities";
import RemoveUserProfile from "../modules/RemoveUserProfile";
import ChangeUsername from "../modules/ChangeUsername";

const Settings = ({ userId, handleLogin, handleLogout }) => {
  

  // unfollow users
  const [users, setUsers] = useState([]);
  useEffect(() => {
    get("/api/followed").then((userObjs) => {
      console.log(userObjs);
      setUsers(userObjs);
    });
  }, []);

  const unfollowUser = (user) => {
    setUsers(users.filter((item) => item._id !== user.userid));
  };

  // console.log(users);
  let usersList = null;
  const hasUsers = users.length !== 0;
  if (hasUsers) {
    usersList = users.map((userObj) => (
      <RemoveUserProfile
        key={`UserProfile_${userObj._id}`}
        _id={userObj._id}
        name={userObj.name}
        googleid={userObj.googleid}
        unfollowUser={unfollowUser}
      />
    ));
  } else {
    usersList = <div>You haven't followed anyone yet!</div>;
  }

  return (
    <Page userId={userId}>
      <button
        onClick={() => {
          googleLogout();
          handleLogout();
        }}
      >
        LOGOUT
      </button>
      <ChangeUsername></ChangeUsername>
      <div>
        <h1>Unfollow users</h1>
        {usersList}
      </div>
    </Page>
  );
};

export default Settings;
