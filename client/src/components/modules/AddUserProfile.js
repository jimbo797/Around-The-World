import { useState } from "react";
import React from "react";
import { post } from "../../utilities";
import "./UserProfile.css";

/**
 * User is a component that renders name of a user
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} name of user
 * @param {string} googleid of user
 * @param {string} locations user has visited
 * @param {string} followUser true/false for if user has followed this person
 */
const AddUserProfile = (props) => {
  const [user, setUser] = useState("");

  const addUser = (value) => {
    const body = { name: props.name, _id: props._id, googleid: props.googleid };
    post("/api/follow", body).then((user) => {
      props.followUser(user);
    });
  };

  function capitalizeFirstLetter(city) {
    // Check if the city is not an empty string or null
    if (city && typeof city === "string") {
      // Capitalize the first letter of each word in the string
      return city
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
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

  function formatCityNames(cityList) {
    for (let i = 0; i < cityList.length - 1; i++) {
      cityList[i] = cityList[i] + ", ";
    }

    return cityList;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addUser && addUser(user);
    setUser("");
  };

  const visited =
    props.locations.length > 0
      ? formatCityNames(capitalizeCityNames(props.locations))
      : "No places visited yet!";

  return (
    <div className="Card-story AddUser-container">
      <p className="AddUser-name">{props.name}</p>
      <p className="">Visited: {visited}</p>
      <button
        type="submit"
        className="UserProfile-button u-pointer"
        value={user}
        onClick={handleSubmit}
      >
        Follow
      </button>
    </div>
  );
};

export default AddUserProfile;
