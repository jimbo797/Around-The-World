import React from "react";

import { useState, useEffect } from "react";
import "../modules/Background";
import { get, post } from "../../utilities.js";
import Background from "../modules/Background";
import Page from '../modules/Page'

const Profile = ({userId}) => {
  return (
    <Page userId={userId}>

    </Page>
  );
};
// import { socket } from "../../client-socket.js";

// const ProfilePage = (props) => {

//   if (props.userId === undefined){
//     return <NotLoggedInPage/>
//   }

//   const [username, setUsername] = useState("");
//   const getUser =() => {
//     // the "sub" field means "subject", which is a unique identifier for each user
//     get("/api/getUsername").then((data) =>{
//       return data.username;
//     });
//   };

//   socket.on("username",(data) => setUsername(data));


//   useEffect(() => {
//     get("/api/getUsername").then((data) => setUsername(data.username));
//   }, []);

//   const changeUsername = () => {
//     let body = { username: message };
//     post("/api/changeUsername", body).then((res) => {
//       console.log(res.message);
//     });
//   };

//   return (
//     <div>
//       <Background>
//         <h1>hi</h1>
//       </Background>
//     </div>
//   );
// };

export default Profile;
