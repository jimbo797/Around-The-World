import React from "react";
import "../../utilities.css";
import "./Background.css";

const Background = ({ children }) => {
  return <div className="box-border bg-pos bg-padding bg-size bg-color">{children}</div>;
};

export default Background;
