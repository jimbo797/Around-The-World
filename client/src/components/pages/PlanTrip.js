import React, { useState, useEffect } from "react";
import Page from "../modules/Page";
import axios from "axios";
import "./PlanTrip.css";

const PlanTrip = () => {

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
            <div id="submit">✈</div>
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
