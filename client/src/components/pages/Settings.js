import React from "react";
import Page from "../modules/Page";
import LogIn from "../modules/LogIn";

const Settings = ({ userId, handleLogin, handleLogout }) => {
  return (
    <LogIn userId={userId} handleLogin={handleLogin} handleLogout={handleLogout}></LogIn>
  )

  // <Page userId={userId}></Page>;
};

export default Settings;
