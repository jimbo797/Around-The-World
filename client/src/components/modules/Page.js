import React from "react";
import Background from "./Background";
import NavBar from "./NavBar";

import './Page.css'
import '../../utilities.css'

const Page = ({ userId, children }) => {
  return (
    <div className='u-absolute page-size u-flexRow page-overflow'>
      <NavBar userId={userId}></NavBar>
      <Background>{children}</Background>
    </div>
  );
};

export default Page;
