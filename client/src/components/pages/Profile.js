import React from "react";
import { useState, useEffect } from "react";
import { socket } from "../../client-socket.js";
import "../modules/Background";
import { get, post } from "../../utilities.js";
import Background from "../modules/Background";
import Page from "../modules/Page";
import "./Profile.css";
import MapComponent from "../modules/Map.js";

const Profile = ({ userId }) => {
  // if (userId === undefined){
  //   return <NotLoggedInPage/> //need to make this page
  // }

  const getUser = () => {
    // the "sub" field means "subject", which is a unique identifier for each user
    get("/api/getUsername").then((data) => {
      return data.username;
    });
  };

  const [username, setUsername] = useState("");
  const [biography, setBiography] = useState(false);

  const getUsername = () => {
    get("/api/getUsername").then((res) => {
      return res.username;
    });
  };

  socket.on("username", (data) => setUsername(data));

  useEffect(() => {
    get("/api/getUsername").then((data) => setUsername(data.username));
  }, []);

  // message stores input field value
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const changeBiography = () => {
    let body = { biography: message };
    post("/api/changeBiography", body).then((res) => {
      console.log(res.message);
    });
    setBiography(true);
  };

  const BiographyModule = (
    <div className="white-text-overall">
      Biography :
      {biography === false ? (
        <div>
          <input
            type="text"
            placeholder="Write a bio for youself!"
            className="profile-bio"
            name="message"
            onChange={handleChange}
            value={message}
          />
          <div className="align-bio-button">
            <button className="bio-button" onClick={changeBiography}>
              Set Biography
            </button>
          </div>
        </div>
      ) : (
        <div>{message}</div>
      )}
    </div>
  );

  return (
    <div>
      <div className="white-text-overall"> Name: {username} </div>
      <div className="padding-between">{BiographyModule}</div>
      {/* {adding images via link for imgur: https://apidocs.imgur.com/} */}
      {/* <img 
      src="https://worldanimalfoundation.org/wp-content/uploads/2023/09/Cute-dogs.jpg"
      alt="new"
      /> */}
    <MapComponent locations={[[12.554729, 55.70651]]}/>
    </div>
  );
};

export default Profile;
