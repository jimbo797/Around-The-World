import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";


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
    post("/api/changeUsername", { username: newUsername }).then((data) => {
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
        value={newUsername}
      ></input>
      <button onClick={handleButton}>Set Username</button>
    </>
  );
};

export default ChangeUsername;
