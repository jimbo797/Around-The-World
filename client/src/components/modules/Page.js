import React from "react";
import { useState, useEffect } from "react";
import { get } from "../../utilities";

import Background from "./Background";
import NavBar from "./NavBar";

import "./Page.css";
import "../../utilities.css";

const Page = ({ userId, children }) => {
  const notLoggedInMessage = "Not logged in";
  const [message, setMessage] = useState(notLoggedInMessage);

  useEffect(() => {
    get("/api/getUsername").then((data) => {
      if (data.username) {
        setMessage(`Logged in as ${data.username}`);
      }
    });
  }, []);

  return (
    <div className="u-absolute page-size u-flexRow page-overflow">
      <NavBar userId={userId}></NavBar>
      <Background>
        <div className="u-flexRow page-username-padding">
          <div>Online Passport</div>
          <div className="u-justifyRight">{message}</div>
        </div>
        {children}
      </Background>
    </div>
  );
};

export default Page;
