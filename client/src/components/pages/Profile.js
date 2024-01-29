import React from "react";
import { useState, useEffect } from "react";
import { socket } from "../../client-socket.js";
import "../modules/Background";
import { get, post } from "../../utilities.js";
import Background from "../modules/Background";
import Page from "../modules/Page";
import "./Profile.css";
import MapComponent from "../modules/Map.js";
import Card from "../modules/Post.js";
import Home from "./Home.js";

const Profile = ({ userId }) => {
  // if (userId === undefined){
  //   return <Home/> //need to make this page
  // }

  // const getUser = () => {
  //   // the "sub" field means "subject", which is a unique identifier for each user
  //   get("/api/getUsername").then((data) => {
  //     return data.username;
  //   });
  // };

  const [username, setUsername] = useState("");
  const [biography, setBiography] = useState(false);
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [locations, setLocations] = useState([]);

  // const getUsername = () => {
  //   get("/api/getUsername").then((res) => {
  //     return res.username;
  //   });
  // };

  // socket.on("username", (data) => setUsername(data));

  useEffect(() => {
    // if (userId) {
    // console.log({userId: userId});
    // get("/api/whoami").then((user) => {
    //   get("/api/getPostsByUser", { userId: user._id }).then((posts) => {
    //     console.log(posts);
    //     // console.log(user)
    //   });
    // });
    get("/api/getUsername").then((data) => setUsername(data.username));
    get("/api/getBiography").then((data) => setMessage(data.biography));
    get("/api/getPostsByUser").then((posts) => {
      setPosts(posts);
      // console.log(posts)
      setLocations(posts.map(({ location }) => location));
    });
    // get("/api/getUser", { userId});
    //   console.log(user);
    // });

    // });
    // }
  }, []);

  // message stores input field value

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


  // displaying my posts
  const [stories, setStories] = useState([]);

  useEffect(() => {
    get("/api/mystories").then((storyObjs) => {
      // setStories(storyObjs);
      let reversedStoryObjs = storyObjs.reverse();
      setStories(reversedStoryObjs);
    });
  }, [stories]);

  let storiesList = null;
  const hasStories = stories.length !== 0;
  if (hasStories) {
    storiesList = stories.map((storyObj) => (
      <Card
        key={`Card_${storyObj._id}`}
        _id={storyObj._id}
        creator_name={storyObj.creator_name}
        content={storyObj.content}
        imgSrc={storyObj.imgSrc}
        location={storyObj.location}
      />
    ));
  } else {
    storiesList = <div>No stories!</div>;
  }

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
    <Page userId={userId}>
      <div>
        <div className="white-text-overall"> Name: {username} </div>
        <div className="padding-between">{BiographyModule}</div>
        {/* {adding images via link for imgur: https://apidocs.imgur.com/} */}
        {/* <img 
      src="https://worldanimalfoundation.org/wp-content/uploads/2023/09/Cute-dogs.jpg"
      alt="new"
      /> */}
        <MapComponent userId={userId} locations={locations} />
        {storiesList}
      </div>
    </Page>
  );
};

export default Profile;
