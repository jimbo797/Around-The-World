import React, { useState, useEffect } from "react";
import Page from "../modules/Page";
import axios from "axios";
import { get, post } from "../../utilities.js";
import "./PlanTrip.css";

function formatParams(params) {
  // iterate of all the keys of params as an array,
  // map it to a new array of URL string encoded key,value pairs
  // join all the url params using an ampersand (&).
  return Object.keys(params)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");
}

const PlanTrip = () => {

  const getMessages = async () =>{
    const options = {
        message: "hello"
    }
    const fullPath = "/api/completions" + "?" + formatParams(options);
    try{
      const response = await post("/api/completions", options);
      console.log(response);
    } catch(error){
      console.error(error);
    }

  }



  return (
    <div className="background">
      <section className="chat-side-bar">
        <button>New Trip</button>
        <ul className="past-trips">
          <li>a trip</li>
        </ul>
        <nav>
          <p>Around the World</p>
        </nav>
      </section>
      <section className="main">
        <h1> Plan a Trip </h1>
        <ul className="feed">

        </ul>
        <div className="bottom">
          <div className="input">
            <input/>
            <div id="submit" onClick={getMessages}>✈</div>
          </div>
          <p className="information">
            We hope planning your next adventure is made easier with 
            Around the World.
          </p>
        </div>
      </section>
    </div>
  )
};

export default PlanTrip;
