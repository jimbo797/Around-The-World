import React from "react";

import "./NavBar.css";
import "../../utilities.css";
// import "../pages/Home.css";

const NavBar = ({ userId }) => {
  const pages = [
    // { name: "AROUND THE WORLD", link: "/" },
    { name: "Feed", link: "/feed" },
    { name: "Profile", link: "/profile" },
    { name: "Add Friends", link: "/addfriends"},
    {name: "Saved Trips", link: "/savedtrips"},
    { name: "Plan a Trip", link: "/plantrip" },
    { name: "Settings", link: "/settings" },
  ];

  const navbarLinks = pages.map(({ name, link }) => (
    <a href={link} key={name}>
      <div className="navbar-text-color navbar-text-padding navbar-text-style">{name}</div>
    </a>
  ));

  return (
    <div className="navbar-size navbar-bgcolor float-left navbar-position">
      {/* <h1 className="page-text">Online Passport</h1> */}
      {/* <img className="navbar-logo" src="assets/logo.png"/> */}
      {/* <div className="NavBar-logoImage"/> */}
      {/* <div> {logoLink} </div> */}
      <a href="/">
        <img className="navbar-logo" src="/assets/logo.png" alt="Your Image"/>
      </a>
      <div className="navbar-centering">{navbarLinks}</div>
    </div>
  );
};

export default NavBar;
