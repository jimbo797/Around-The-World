import React, { useState, useEffect } from "react";
import Page from "../modules/Page";
import axios from "axios";

/**
 * ImgurRequest is a component that renders image requested from Imgur API
 *
 * Proptypes
 * @param {string} imgId imgur link
 */
const ImgurRequest = (props) => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get("https://api.imgur.com/3/image/" + props.imgId, {
          headers: {
            Authorization: "Client-ID 6b1e2512d36fa88",
          },
        });

        setImageData(response.data.data);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div>
      {imageData && (
        <div>
          <img style={{maxWidth: "100%", maxHeight: "600px", height: "auto"}}src={imageData.link} referrerpolicy="no-referrer" alt={imageData.title} />
        </div>
      )}
    </div>
  );
};

export default ImgurRequest;
