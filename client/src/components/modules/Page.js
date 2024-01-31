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
      const newMessage = data.username ? `Logged in as ${data.username}` : notLoggedInMessage;
      setMessage(newMessage);
    });
  }, []);

  return (
    <div className="flex flex-row page-size">
      <NavBar userId={userId}></NavBar>
      <Background>
        <div className="u-flexRow page-text">
          <div className="u-justifyRight">{message}</div>
        </div>
        {children}
      </Background>
    </div>
  );
};

export default Page;
