import React, { StrictMode, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Profile from "./pages/Profile.js";
import Feed from "./pages/Feed.js";
import PlanTrip from "./pages/PlanTrip.js";
import Settings from "./pages/Settings.js";
import Page from "./modules/Page.js";
import LogInPage from "./pages/LogInPage.js";
import Home from "./pages/Home.js";
import AddFriends from "./pages/AddFriends.js";
// import MapMarker from "./pages/MapMarker.js"

import "../utilities.css";
import "./App.css";

// import './App.module.css';
import "./_resets.module.css";
// import Home from './components/pages/Home.js';

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import MapComponent from "./modules/Map.js";
import SavedTrips from "./pages/SavedTrips.js";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined); // can't use console.log to check this on render since it's async and delayed
  const [haltRedirect, setHalt] = useState(true);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      } else if (window.location.pathname !== "/") {
        // if they are not logged in and not on the home page
        redirectToHome();
      }
    });
  }, [userId]);

  const redirectToFeed = () => {
    window.location.href = "/feed";
  };

  const redirectToHome = () => {
    window.location.href = "/";
  };

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    // console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken })
      .then((user) => {
        setUserId(user._id);
        post("/api/initsocket", { socketid: socket.id });
      })
      .then(redirectToFeed);
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout").then(redirectToHome);
  };

  // if (!userId)
  //   return <LogInPage handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />;

  return (
    <div>
      {/* <Page userId={userId}> */}
      <Routes>
        <Route
          path="/skeleton"
          element={
            <Skeleton handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
          }
        />
        <Route
          path="/"
          className="clapyResets root"
          element={
            <Home userId={userId} handleLogin={handleLogin} handleLoggedIn={redirectToFeed} />
          }
        />
        <Route path="/feed" element={<Feed userId={userId} />} />
        <Route path="/profile" element={<Profile userId={userId} />} />
        <Route path="/addfriends" element={<AddFriends userId={userId} />} />
        <Route path="/plantrip" element={<PlanTrip userId={userId} />} />
        <Route path="/savedtrips" element={<SavedTrips userId={userId} />} />
        {/* <Route path="/map" element={<MapMarker userId={userId} />} /> */}
        <Route
          path="/settings"
          element={
            <Settings handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
          }
        />
        <Route path="*" element={<NotFound userId={userId} />} />
      </Routes>
      {/* </Page> */}
    </div>
  );
};

export default App;
