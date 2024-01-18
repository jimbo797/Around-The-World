import React from "react";
import "../../utilities.css";
import "./Background.css";

const Background = ({ children }) => {
  return <div className="backgroundfill">{children}</div>;
};

export default Background;
