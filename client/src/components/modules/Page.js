import React from "react";
import Background from "./Background";
import NavBar from "./NavBar";

const Page = ({ userId, children }) => {
  return (
    <div>
      <NavBar userId={userId}></NavBar>
      <Background>{children}</Background>
    </div>
  );
};

export default Page;
