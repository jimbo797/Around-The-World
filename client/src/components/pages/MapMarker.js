import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactMapGL, { Marker } from "react-map-gl";
import Page from "../modules/Page";

// IGNORE THIS IS TO TEST OUT CLICKING MARKERS

const MapMarker = () => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12,
  });

  return (
    <Page>
      <ReactMapGL
        {...viewport}
        onViewportChange={(newViewport) => setViewport(newViewport)}
        mapboxApiAccessToken={
          process.env.MAPBOX_ACCESS_TOKEN
        }
      >
        {/* Add your markers with links */}
        <Marker latitude={37.7749} longitude={-122.4194} offsetLeft={-20} offsetTop={-10}>
          <Link to="/feed">Marker Content</Link>
        </Marker>
      </ReactMapGL>
    </Page>
  );
};

export default MapMarker;
