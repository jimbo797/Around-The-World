import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import Page from "../modules/Page";
import LogIn from "../modules/LogIn";

import { get, post } from "../../utilities";
import RemoveUserProfile from "../modules/RemoveUserProfile";
import ChangeUsername from "../modules/ChangeUsername";
import ChangeBio from "../modules/ChangeBio";
import "./Settings.css";

const Settings = ({ userId, handleLogin, handleLogout }) => {
  // unfollow users
  const [users, setUsers] = useState([]);
  useEffect(() => {
    get("/api/followed").then((userObjs) => {
      setUsers(userObjs);
    });
  }, []);

  const unfollowUser = (user) => {
    setUsers(users.filter((item) => item._id !== user.userid));
  };

  let usersList = null;
  const hasUsers = users.length !== 0;
  if (hasUsers) {
    usersList = users.map((userObj) => (
      <RemoveUserProfile
        key={`UserProfile_${userObj._id}`}
        _id={userObj._id}
        name={userObj.name}
        googleid={userObj.googleid}
        locations={userObj.locations}
        unfollowUser={unfollowUser}
      />
    ));
  } else {
    usersList = <div className="Settings-unfollow">You haven't followed anyone yet!</div>;
  }

  return (
    <Page userId={userId}>
      <button
        className="Settings-logout"
        onClick={() => {
          googleLogout();
          handleLogout();
        }}
      >
        LOGOUT
      </button>
      <div className="Settings-container">
        <ChangeUsername></ChangeUsername>
        <ChangeBio></ChangeBio>
      </div>

      <div>
        <h1 className="Settings-unfollow">Unfollow users</h1>
        {usersList}
      </div>
    </Page>
  );
};

export default Settings;
