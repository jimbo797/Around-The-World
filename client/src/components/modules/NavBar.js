import React from "react";

import "./NavBar.css";
import "../../utilities.css";

const NavBar = ({ userId }) => {
  const pages = [
    { name: "Feed", link: "/" },
    { name: "Profile", link: "/profile" },
    { name: "Plan a Trip", link: "/plantrip" },
    { name: "Settings", link: "/settings" },
  ];
  const navbarLinks = pages.map(({ name, link }) => (
    <a href={link} key={name}>
      <div className="navbar-text-color navbar-text-padding navbar-text-style">{name}</div>
    </a>
  ));

  return (
    <div className="navbar-size navbar-bgcolor">
      <div>{userId}</div>
      {navbarLinks}
    </div>
  );
};

export default NavBar;
