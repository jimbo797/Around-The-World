import React, { useState, useEffect } from "react";
import Page from "../modules/Page";
import "./Home.css";

const Home = ({ userId }) => {
    // if (userId === undefined){
    //   return <NotLoggedInPage/> //need to make this page
    // }
  
    return (
      <div>
        {/* {adding images via link for imgur: https://apidocs.imgur.com/} */}
        {/* <img 
        src="https://worldanimalfoundation.org/wp-content/uploads/2023/09/Cute-dogs.jpg"
        alt="new"
        /> */}
        <p>Hi</p>
      </div>
    );
  };
  
  export default Home;