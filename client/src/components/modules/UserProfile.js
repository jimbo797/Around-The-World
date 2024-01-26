import React from "react";


/**
 * User is a component that renders name of a user
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} name of user
 * @param {string} googleid of user
 */
const UserProfile = (props) => {
  return (
    <div className="Card-story">
      <p className="">{props.name}</p>
      <p className="">{props.googleid}</p>
    </div>
  );
};

export default UserProfile;