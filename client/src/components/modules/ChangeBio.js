import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";


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
    post("/api/changeBiography", { biography: newBio }).then((data) => {
      console.log(data);
    });
    // get("/api/user").then((data) => {
    //   console.log(data);
    // });
  };

  return (
    <>
      <input
        type="text"
        placeholder="Username"
        className="profile-bio"
        name="message"
        onChange={handleChange}
        value={newBio}
      ></input>
      <button onClick={handleButton}>Set Biography</button>
    </>
  );
};

export default ChangeBio;
