import React, { useState, useEffect } from "react";
import LogIn from "../modules/LogIn";
import Home from "./Home.js";
import "../App.css";
import '../_resets.module.css';

const LogInPage = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div>
      <LogIn userId={userId} handleLogin={handleLogin} handleLogout={handleLogout}></LogIn>
    </div>
  );
};

export default LogInPage;
