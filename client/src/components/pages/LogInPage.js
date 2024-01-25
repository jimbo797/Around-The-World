import React, { useState, useEffect } from "react";
import LogIn from "../modules/LogIn";

const LogInPage = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div>
      <LogIn userId={userId} handleLogin={handleLogin} handleLogout={handleLogout}></LogIn>
    </div>
  );
};

export default LogInPage;
