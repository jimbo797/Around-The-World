import { useState } from "react";
import React from "react";
import { post } from "../../utilities";

/**
 * User is a component that renders name of a user
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} name of user
 * @param {string} googleid of user
 * @param {string} unfollowUser true/false for if user has followed this person
 */
const RemoveUserProfile = (props) => {
  const [user, setUser] = useState("");

  const removeUser = (value) => {
    const body = { _id: props._id};
    // console.log("before req" + props._id);
    post("/api/unfollow", body).then((user) => {
      // console.log("req made");
      props.unfollowUser(user);
      console.log("after");
    });
    // .then((following) => {
    //   console.log("req done")
    //   props.followUser(following);
    // });

    // .then((user) => {
    //   // display this comment on the screen
    //   props.followUser(user);
    // });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    removeUser && removeUser(user);
    setUser("");
    // const body = { name: props.name, _id: props._id, googleid: props.googleid };
    // // console.log(body.googleid)
    // post("/api/follow", body).then((res) => {
    //   console.log("submitted" + res);
    // })
  };

  return (
    <div className="Card-story">
      <p className="">{props.name}</p>
      <p className="">{props.googleid}</p>
      <button
        type="submit"
        className="NewPostInput-button u-pointer"
        // value="Follow"
        // value={props.googleid}
        value={user}
        onClick={handleSubmit}
      >
        Unfollow
      </button>
    </div>
  );
};

export default RemoveUserProfile;
