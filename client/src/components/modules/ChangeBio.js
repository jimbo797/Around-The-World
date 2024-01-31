import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "./ChangeBio.css";

const ChangeBio = () => {
  const [newBio, setBio] = useState("");

  useEffect(() => {
    get("/api/getBiography").then((data) => {
      setBio(data.biography);
    });
  }, []);

  const handleChange = (event) => {
    setBio(event.target.value);
  };

  const handleButton = () => {
    post("/api/changeBiography", { biography: newBio });
  };

  return (
    <div className="u-flexRow ChangeBio-input">
      <input
        type="text"
        placeholder="Set new bio"
        className="profile-bio"
        name="message"
        onChange={handleChange}
        value={newBio}
      ></input>
      <button className="ChangeBio-text ChangeBio-button" onClick={handleButton}>
        Set Biography
      </button>
    </div>
  );
};

export default ChangeBio;
