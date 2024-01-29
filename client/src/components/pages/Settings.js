import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import Page from "../modules/Page";
import LogIn from "../modules/LogIn";

import { get, post } from "../../utilities";
import RemoveUserProfile from "../modules/RemoveUserProfile";

const Settings = ({ userId, handleLogin, handleLogout }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    get("/api/getUsername").then((data) => {
      setUsername(data.username);
    });
  }, []);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleButton = () => {
    post("/api/changeUsername", { username: username }).then((data) => {
      console.log(data);
    });
    // get("/api/user").then((data) => {
    //   console.log(data);
    // });
  };

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
        locations={userObj.locations}
        unfollowUser={unfollowUser}
      />
    ));
  } else {
    usersList = <div>You haven't followed anyone yet!</div>;
  }

  return (
    <>
      {/* <LogIn userId={userId} handleLogin={handleLogin} handleLogout={handleLogout}></LogIn> */}
      {/* <input
        type="text"
        placeholder="Username"
        className="profile-bio"
        name="message"
        onChange={handleChange}
        value={username}
      ></input>
      <button onClick={handleButton}>Set Username</button> */}
      <Page userId={userId}>
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          LOGOUT
        </button>
        <div>
          <h1>Unfollow users</h1>
        {usersList}
        </div>
        
      </Page>
    </>
  );
};

export default Settings;
