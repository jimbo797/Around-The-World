import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "./ChangeUsername.css";

const ChangeUsername = () => {
  const [newUsername, setUsername] = useState("");

  useEffect(() => {
    get("/api/getUsername").then((data) => {
      setUsername(data.username);
    });
  }, []);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleButton = () => {
    post("/api/changeUsername", { username: newUsername }).then((data) => {});
  };

  return (
    <div className="u-flexRow ChangeUsername-input">
      <input
        type="text"
        placeholder="Set new username"
        className="profile-bio"
        name="message"
        onChange={handleChange}
        value={newUsername}
      ></input>
      <button className="ChangeUsername-text ChangeUsername-button" onClick={handleButton}>
        Set Username
      </button>
    </div>
  );
};

export default ChangeUsername;
