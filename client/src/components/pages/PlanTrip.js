import React, { useState, useEffect } from "react";
import Page from "../modules/Page";
import axios from "axios";
import "./PlanTrip.css";

const PlanTrip = ({ userId }) => {
  return <Page userId={userId}></Page>;
};

export default PlanTrip;
