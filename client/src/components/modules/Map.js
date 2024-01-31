import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import { get, post } from "../../utilities.js";
import UnsavedPost from "../modules/UnsavedPost.js";
import MapPopup from "./MapPopup.js";

/**
 * Map is a component that displays the interactive Mapbox map
 *
 * Proptypes
 */
const MapComponent = ({ userId, posts }) => {
  const axios = require("axios");
  const [manualLocations, setLocations] = useState([]);
  const [popupPosts, setPopupPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const locationToString = (location) => `${location.latitude}_${location.longitude}`;

  useEffect(() => {
    get("/api/locations").then((visited) => {
      setLocations(visited.locations);
    });
  }, []);

  // Utilizing the Mapbox GL API to create map and markers on the map
  useEffect(() => {
    // Set your Mapbox access token
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWlyYW5kYWxpdTAzIiwiYSI6ImNscnJhazZuNDBjNzIyanBkeWtveWVyNmYifQ.FnTwTmwWIwlexn6FkBXGbw";
    // mapboxgl.accessToken = process_env.MAPBOX_ACCESS_TOKEN;

    // Create a new Map instance
    const map = new mapboxgl.Map({
      container: "map", // container ID
      center: [-71.094162, 42.360092], // starting position [lng, lat]
      zoom: 2, // starting zoom
    });

    // add markers
    for (const element of manualLocations) {
      // TODO: Remove manual locations
      convertLocation(element).then((converted) => {
        var [longitude, latitude] = [converted[0].longitude, converted[0].latitude];
        new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`${element}`));
        //   .addTo(map); //TODO: Change this popup
      });
    }

    const locationsMap = {};
    for (const post of posts) {
      if (!post.location) continue;
      const stringifiedLocation = locationToString(post.location);
      if (!locationsMap[stringifiedLocation]) locationsMap[stringifiedLocation] = [];
      locationsMap[stringifiedLocation].push(post);
    }

    for (const key of Object.keys(locationsMap)) {
      // if (!post.location) continue;
      const locationArray = locationsMap[key];
      const { latitude, longitude } = locationArray[0].location;
      const popup = new mapboxgl.Popup()
        .addClassName("popup-text-color")
        // .setHTML(`<h1>You visited ${locationArray.length} locations here!</h1>`)
        .on("open", () => {
          setPopupPosts(locationArray);
          setShowPopup(true);
        })
        .on("close", () => {
          setShowPopup(false);
        });
      new mapboxgl.Marker().setLngLat([longitude, latitude]).setPopup(popup).addTo(map); //TODO: Add a popup
    }

    return () => {
      // Cleanup the map instance
      map.remove();
    };
  }, [posts, manualLocations]); // Empty dependency array ensures that the effect runs only once

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

  // Calling the Geocoding API to convert city names to latitude longitude coordinates
  const convertLocation = async (city) => {
    try {
      const response = await axios.get("https://api.api-ninjas.com/v1/geocoding", {
        params: { city: city },
        headers: {
          "X-Api-Key": "P++ZL0Z+VV3YUYrRazvHnA==73PCXJetnMsZmehj",
          // "X-Api-Key": process.env.GEOCODING_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const addLocation = (value) => {
    convertLocation(value).then((res) => {
      if (res.length === 0) {
        alert("Enter a valid city");
      } else {
        const body = { location: value };
        post("/api/setlocation", body);
        setLocations([...locations, value]);
      }
    });
  };

  return (
    <div>
      <div className="flex justify-center items-center box-border map-container">
        {showPopup === true ? (
          <MapPopup posts={popupPosts} handleExit={() => setShowPopup(false)}></MapPopup>
        ) : (
          <></>
        )}
        <div id="map" />
      </div>
    </div>
  );
};

export default MapComponent;
