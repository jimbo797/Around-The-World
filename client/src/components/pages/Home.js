import React, { memo } from "react";

import "../_resets.module.css";
import "./Home.css";
import LogIn from "../modules/LogIn";

const Home = ({ userId, handleLogin, handleLoggedIn }) => {
  return (
    <div className="clapyResets root u-flex">
      <div className="prioritize">
        <div className="travelAnywhere">travel anywhere.</div>

        <div className="googleLoginPos">
          <LogIn userId={userId} handleLogin={handleLogin} handleLoggedIn={handleLoggedIn}></LogIn>
        </div>

        <div className="rectangle20 pointer-events-none">
          <div className="startTraveling pointer-events-none">start traveling</div>
        </div>

        <div className="aroundTheWRld11"></div>
        <div className="aROUNDTHEWORLD">AROUND THE WORLD</div>
      </div>
      <div className="traveling1"></div>
    </div>
  );
};

export default Home;
