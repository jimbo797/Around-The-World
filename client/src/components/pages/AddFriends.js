import React, { useState, useEffect } from "react";
import Page from "../modules/Page";
import { get } from "../../utilities";
import UserProfile from "../modules/UserProfile";


const AddFriends = ({ userId }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        get("/api/allusers").then((userObjs) => {
          // setStories(storyObjs);
          setUsers(userObjs);
        });
      }, [users]);
    
    // console.log(users); 
    let usersList = null;
    const hasUsers = users.length !== 0;
    if (hasUsers) {
        usersList = users.map((userObj) => (
          <UserProfile
            key={`UserProfile_${userObj._id}`}
            _id={userObj._id}
            name={userObj.name}
            googleid={userObj.googleid}
          />
        ));
      } else {
        usersList = <div>No users!</div>;
      }
    // console.log(usersList);

  return (
    <Page userId={userId}>
        <div className="overflow-scroll">
          {/* <NewStory addNewStory={addNewStory} /> */}
          {usersList}
        </div>
    </Page>
    );
};

export default AddFriends;