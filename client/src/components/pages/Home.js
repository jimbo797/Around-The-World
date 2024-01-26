// import React, { useState, useEffect } from "react";
// import Page from "../modules/Page";
// import "./Home.css";

// const Home = ({ userId }) => {
//     // if (userId === undefined){
//     //   return <NotLoggedInPage/> //need to make this page
//     // }
  
//     return (
//       <div>
//         {/* {adding images via link for imgur: https://apidocs.imgur.com/} */}
//         {/* <img 
//         src="https://worldanimalfoundation.org/wp-content/uploads/2023/09/Cute-dogs.jpg"
//         alt="new"
//         /> */}
//         <p>Hi</p>
//       </div>
//     );
//   };
  
//   export default Home;

import React, { memo } from 'react';

import '../_resets.module.css';
import './Home.css';
import LogIn from "../modules/LogIn";



const Home = memo(function Desktop1({ userId, handleLogin, handleLogout }) {
  return (
    <div className="clapyResets root u-flex">
      <div className="prioritize">
        <div className="travelAnywhere">travel anywhere.</div>
        <div className="rectangle20"></div>
        <button className="startTraveling">start traveling</button>
        <div className="aroundTheWRld11"></div>
        <div className="aROUNDTHEWORLD">AROUND THE WORLD</div>
      </div>
      <div className="traveling1"></div>
    </div>
  );
});

export default Home;