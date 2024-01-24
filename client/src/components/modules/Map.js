import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
/**
 * Map is a component that displays the interactive Mapbox map
 *
 * Proptypes
 */
const MapComponent = () => {
  // var locations = [];
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Set your Mapbox access token
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWlyYW5kYWxpdTAzIiwiYSI6ImNscnJhazZuNDBjNzIyanBkeWtveWVyNmYifQ.FnTwTmwWIwlexn6FkBXGbw";

    // Create a new Map instance
    const map = new mapboxgl.Map({
      container: "map", // container ID
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    // add markers
    for (const element of locations) {
      var [longitude, latitude] = element;
      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
    }

    return () => {
      // Cleanup the map instance
      map.remove();
    };
  }, [locations]); // Empty dependency array ensures that the effect runs only once

  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    addLocation && addLocation(value);
    setValue("");
  };

  const checkValidCoordinates = (latitude, longitude) => {
    if (-180 > longitude || longitude > 180) return false;
    if (-90 > latitude || latitude > 90) return false;
    return true;
  };

  const addLocation = (value) => {
    // const body = { parent: props.storyId, content: value };
    // post("/api/comment", body).then((comment) => {
    //   // display this comment on the screen
    //   props.addNewComment(comment);
    // });
    const coordinatesArray = value.slice(1, -1).split(",");

    // Convert each substring to a number
    const longitude = parseFloat(coordinatesArray[0]);
    const latitude = parseFloat(coordinatesArray[1]);
    // console.log(typeof longitude);
    // locations.push([longitude, latitude]);
    // console.log(locations);

    if (!checkValidCoordinates(latitude, longitude)) return;
    if (!isNaN(longitude) && !isNaN(latitude)) {
      setLocations([...locations, [longitude, latitude]]);
    }
  };

  // return <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;
  return (
    <div>
      <div className="u-flex">
        <input
          type="text"
          placeholder={"Enter locations you've visited in the format of [longitude, latitude]: "}
          value={value}
          onChange={handleChange}
          className="NewPostInput-input"
        />

        <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      <div id="map" />
    </div>
  );
};

export default MapComponent;
