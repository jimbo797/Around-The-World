import React, {useState, useEffect} from "react";
import Page from "../modules/Page";
import axios from "axios";
import "./PlanTrip.css"

// getting images from imgur
const PlanTrip = () => {
//   const [imageData, setImageData] = useState(null);

//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const response = await axios.get("https://api.imgur.com/3/image/XgbZdeA", {
//           headers: {
//             Authorization: "Client-ID 6b1e2512d36fa88",
//           },
//         });

//         setImageData(response.data.data);
//         console.log(imageData);
//       } catch (error) {
//         console.error("Error fetching image:", error);
//       }
//     };

//     fetchImage();
//   }, []);

//   return (
//     <div>
//       {imageData && (
//         <div>
//           <h1>Image Details</h1>
//           <img src={imageData.link} referrerpolicy="no-referrer" alt={imageData.title} />
//           <p>Title: {imageData.title}</p>
//           <p>Description: {imageData.description}</p>
//         </div>
//       )}
//     </div>
//   );
// };

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
          Authorization: "Client-ID YOUR_CLIENT_ID", // Replace with your Imgur client ID
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

export default PlanTrip;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PlanTrip = () => {
//   const [imageData, setImageData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://api.imgur.com/3/image/y6nKRFv", {
//           headers: {
//             Authorization: "Client-ID 6b1e2512d36fa88",
//           },
//         });

//         setImageData(response.data);
//       } catch (error) {
//         console.error("Error fetching image data:", error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array to execute the effect only once

//   return (
//     <div>
//       {imageData && (
//         <div>
//           <h1>Image Details</h1>
//           <img src={imageData.link} alt={imageData.title} />
//           <p>Title: {imageData.title}</p>
//           <p>Description: {imageData.description}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlanTrip;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const PlanTrip = () => {
//   const [imageData, setImageData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("https://api.imgur.com/3/image/cvWgXFc", {
//           headers: {
//             Authorization: "Client-ID 6b1e2512d36fa88",
//           },
//         });

//         setImageData(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {imageData && (
//         <div>
//           <h1>Image Details</h1>
//           <img src={imageData.link} alt={imageData.title} />
//           <p>Title: {imageData.title}</p>
//           <p>Description: {imageData.description}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlanTrip;