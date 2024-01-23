// components for uploading usng imgur api

import React, {useState, useEffect} from "react";
import Page from "../modules/Page";
import axios from "axios";

const ImgurUpload = () => {

const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    // Assuming you have an input field for selecting a file
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post("https://api.imgur.com/3/image", formData, {
        headers: {
          Authorization: "Client-ID 6b1e2512d36fa88", // Replace with your Imgur client ID
        },
      });

      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImgurUpload;