import React from "react";

const NavBar = ({ userId }) => {
  return (
    <div>
      <div>{userId}</div>

      <a href="/feed">
        <div>Feed</div>
      </a>
      <a href="/profile">
        <div>Profile</div>
      </a>
      <a href="/plantrip">
        <div>Plan a Trip</div>
      </a>
      <a href="/settings">
        <div>Settings</div>
      </a>
    </div>
  );
};

export default NavBar;
