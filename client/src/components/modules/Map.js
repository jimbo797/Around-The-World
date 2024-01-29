import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import { get, post } from "../../utilities.js";

/**
 * Map is a component that displays the interactive Mapbox map
 *
 * Proptypes
 */
const MapComponent = ({ userId, locations }) => {
  const axios = require("axios");
  const [manualLocations, setLocations] = useState([]);

  // console.log(locations);

  // const request = require('request');

  // var locations = [];

  useEffect(() => {
    get("/api/locations").then((visited) => {
      // console.log(visited);
      setLocations(visited.locations);
    });
  }, []);

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
        // console.log("element" + element)
        // console.log(typeof converted);
        var [longitude, latitude] = [converted[0].longitude, converted[0].latitude];
        new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup().setHTML("<NavBar/>"))
          .addTo(map); //TODO: Change this popup
      });
    }

    for (const location of locations) {
      if (!location) continue;
      const { latitude, longitude } = location;
      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map); //TODO: Add a popup
    }

    return () => {
      // Cleanup the map instance
      map.remove();
    };
  }, [locations, manualLocations]); // Empty dependency array ensures that the effect runs only once

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

  // const checkValidCoordinates = (latitude, longitude) => {
  //   if (-180 > longitude || longitude > 180) return false;
  //   if (-90 > latitude || latitude > 90) return false;
  //   return true;
  // };

  const convertLocation = async (city) => {
    try {
      //   const formData = new FormData();
      //   formData.append("image", image);

      const response = await axios.get("https://api.api-ninjas.com/v1/geocoding", {
        params: { city: city },
        headers: {
          "X-Api-Key": "P++ZL0Z+VV3YUYrRazvHnA==73PCXJetnMsZmehj",
          // "X-Api-Key": process.env.GEOCODING_KEY,
        },
      });
      // console.log("res" + response.data);
      // console.log("Upload successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const addLocation = (value) => {
    // console.log("add location");
    //     convertLocation(value).then((response) => {
    //         // console.log(response[0].longitude);
    //         // setLocations([...locations, [response[0].longitude, response[0].latitude]]);
    //         console.log(locations);

    //         // const body = {location: value};
    //         // post("/api/setlocation", body);
    //   })
    convertLocation(value).then((res) => {
      console.log("length", res.length);

      if (res.length === 0) {
        // console.log(typeof res[0].longitude === Number);
        alert("Enter a valid city");
      } else {
        console.log("else");
        const body = { location: value };
        post("/api/setlocation", body);
        setLocations([...locations, value]);
      }
    });

    // const body = {location: value};
    // post("/api/setlocation", body);
  };

  //   const addLocation = (value) => {
  //     // const body = { parent: props.storyId, content: value };
  //     // post("/api/comment", body).then((comment) => {
  //     //   // display this comment on the screen
  //     //   props.addNewComment(comment);
  //     // });

  //         // const body = {location: [response[0].longitude, response[0].latitude]};
  //         // console.log(body);
  //         // post("/api/setlocation", body);

  //         // const addUser = (value) => {
  //         //     const body = { name: props.name, _id: props._id, googleid: props.googleid };
  //         //     // console.log("before req" + props._id);
  //         //     post("/api/follow", body).then((user) => {
  //         //       // console.log("req made");
  //         //       props.followUser(user);
  //         //       // console.log("after");
  //         //     });
  //     })

  // const coordinatesArray = value.slice(1, -1).split(",");
  // const longitude = parseFloat(coordinatesArray[0]);
  // const latitude = parseFloat(coordinatesArray[1]);
  // if (!checkValidCoordinates(latitude, longitude)) return;
  // if (!isNaN(longitude) && !isNaN(latitude)) {
  //   setLocations([...locations, [longitude, latitude]]);
  // }

  // Convert each substring to a number

  // console.log(typeof longitude);
  // locations.push([longitude, latitude]);
  // console.log(locations);

  // return <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;
  return (
    <div>
      <div className="u-flex">
        <input // TODO: Remove manual locations
          type="text"
          placeholder={"Enter a city you've visited: "}
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
