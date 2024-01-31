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
 * @param {string} locations of user
 * @param {string} unfollowUser true/false for if user has followed this person
 */
const RemoveUserProfile = (props) => {
  const [user, setUser] = useState("");

  const removeUser = (value) => {
    const body = { _id: props._id};
    post("/api/unfollow", body).then((user) => {
      props.unfollowUser(user);
    });
    // .then((following) => {
    //   props.followUser(following);
    // });

    // .then((user) => {
    //   // display this comment on the screen
    //   props.followUser(user);
    // });
  };
  function capitalizeFirstLetter(city) {
    // Check if the city is not an empty string or null
    if (city && typeof city === 'string') {
      // Capitalize the first letter of each word in the string
      return city
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } else {
      // Return the original value for non-string or empty values
      return city;
    }
  }

  function capitalizeCityNames(cityList) {
    // Check if the input is an array
    if (Array.isArray(cityList)) {
      // Capitalize each city name using the capitalizeFirstLetter function
      return cityList.map(capitalizeFirstLetter);
    } else {
      // Return the original value for non-array input
      return cityList;
    }
  }

  function formatCityNames(cityList){
   
    for ( let i = 0; i < cityList.length - 1; i++){
      cityList[i] = cityList[i] + ", ";
    }

    return cityList
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    removeUser && removeUser(user);
    setUser("");
    // const body = { name: props.name, _id: props._id, googleid: props.googleid };
    // post("/api/follow", body).then((res) => {
    // })
  };
  const visited = (props.locations.length > 0) ? formatCityNames(capitalizeCityNames(props.locations)) : "No places visited yet!";

  return (
    <div className="Card-story AddUser-container">
      <p className="AddUser-name">{props.name}</p>
      <p className="">Visited: {visited}</p>
      <button
        type="submit"
        className="UserProfile-button u-pointer"
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
