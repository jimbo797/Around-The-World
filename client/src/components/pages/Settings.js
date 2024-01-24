import React, { useState, useEffect } from "react";
import Page from "../modules/Page";
import LogIn from "../modules/LogIn";

import { get, post } from "../../utilities";

const Settings = ({ userId, handleLogin, handleLogout }) => {
  const [username, setUsername] = useState('');

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

  return (
    <>
      <LogIn userId={userId} handleLogin={handleLogin} handleLogout={handleLogout}></LogIn>
      <input
        type="text"
        placeholder="Username"
        className="profile-bio"
        name="message"
        onChange={handleChange}
        value={username}
      ></input>
      <button onClick={handleButton}>Set Username</button>
    </>
  );
};

export default Settings;
