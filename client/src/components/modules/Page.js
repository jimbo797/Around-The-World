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
    get("/api/whoami").then((user) => { // TODO: Change to user's profile name instead of their google name
      if (user._id) {
        setMessage(`Logged in as ${user.name}`);
      } else {
        setMessage(notLoggedInMessage);
      }
    });
  }, []);

  return (
    <div className="u-absolute page-size u-flexRow page-overflow">
      <NavBar userId={userId}></NavBar>
      <Background>
        <div className="u-flexRow page-username-padding page-head-size">
          <div>Online Passport</div>
          <div className="u-justifyRight">{message}</div>
        </div>
        {children}
      </Background>
    </div>
  );
};

export default Page;
