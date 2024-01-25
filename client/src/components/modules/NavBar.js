import React from "react";

import "./NavBar.css";
import "../../utilities.css";

const NavBar = ({ userId }) => {
  const pages = [
    { name: "Online Passport", link: "/"},
    { name: "Feed", link: "/feed" },
    { name: "Profile", link: "/profile" },
    { name: "Plan a Trip", link: "/plantrip" },
    { name: "Settings", link: "/settings" },
  ];
  const navbarLinks = pages.map(({ name, link }) => (
    <a href={link} key={name}>
      <div className="navbar-text-color navbar-text-padding navbar-text-style">{name}</div>
    </a>
  ));

  console.log(navbarLinks);
  return (
    <div className="navbar-size navbar-bgcolor float-left navbar-position">
      {/* <h1 className="page-text">Online Passport</h1> */}
      <div className="navbar-centering">{navbarLinks}</div>
    </div>
  );
};

export default NavBar;
