import React, { useState, useRef } from "react";
import { post } from "../../utilities";
import axios from "axios";

import "./NewPostInput.css";
import ImgurUpload from "./ImgurUpload";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
// const NewPostInput = (props) => {
//   const [value, setValue] = useState("");

//   // called whenever the user types in the new post input box
//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   // called when the user hits "Submit" for a new post
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     props.onSubmit && props.onSubmit(value);
//     setValue("");
//   };

//   return (
//     <div className="u-flex">
//       <input
//         type="text"
//         placeholder={props.defaultText}
//         value={value}
//         onChange={handleChange}
//         className="NewPostInput-input"
//       />
      
//       <button
//         type="submit"
//         className="NewPostInput-button u-pointer"
//         value="Submit"
//         onClick={handleSubmit}
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

/**
 * New Story is a New Post component for stories
 */
// const NewStory = (props) => {
//   const addStory = (value) => {
//     const body = { content: value };
//     post("/api/story", body).then((story) => {
//       // display this story on the screen
//       props.addNewStory(story);
//     });
//   };

//   return <NewPostInput defaultText="New Story" onSubmit={addStory} />;
// };

// /**
//  * New Story is a New Post component for stories
//  * @param {string} imgSrc imgur link
//  */
// const NewStory = (props) => {
//   const addStory = (value) => {
//     const body = { content: value };
//     post("/api/story", body).then((story) => {
//       // display this story on the screen
//       props.addNewStory(story);
//     });
//   };

//   // // called whenever the user types in the new post input box
//   // const handleChange = (event) => {
//   //   setValue(event.target.value);
//   // };

//   // // called when the user hits "Submit" for a new post
//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   //   props.onSubmit && props.onSubmit(value);
//   //   setValue("");
//   // };

//   return (
//     // <div>
//     //   <input
//     //     type="text"
//     //     placeholder={"New Image"}
//     //     value={props.imgSrc}
//     //     onChange={handleChange}
//     //     className="NewPostInput-input"
//     //   />
//       <NewPostInput defaultText="New Story" onSubmit={addStory} />  

//     // </div>
    
    
//   );
// };

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} storyId to add comment to
 */
// const NewComment = (props) => {
//   const addComment = (value) => {
//     const body = { parent: props.storyId, content: value };
//     post("/api/comment", body).then((comment) => {
//       // display this comment on the screen
//       props.addNewComment(comment);
//     });
//   };

//   return <NewPostInput defaultText="New Comment" onSubmit={addComment} />;
// };



/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters (might need to remove from props later!!)
 */
const NewStory = (props) => {
  // const initialValues = {
  //   caption: "",
  //   img: ""
  // };

  const [value, setValue] = useState("");
  const [image, setImage] = useState(null); // for Imgur upload
  var imgId = "";
  const inputFile = useRef(null);

  // when imgur upload made
  const handleImageChange = (event) => {
    // Assuming you have an input field for selecting a file
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  
  // called whenever the user types in the new post input box
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setValues({
  //     ...values,
  //     [name]: value,
  //   });
  //   // setValues(event.target.value);
  // };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // upload image to imgur api
  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post("https://api.imgur.com/3/image", formData, {
        headers: {
          Authorization: "Client-ID 6b1e2512d36fa88", // Replace with your Imgur client ID
        },
      });

      console.log("Upload successful:", response.data);
      imgId = parseImgurImageId(response.data.data.link);
      
      // console.log(response.data.data.link);
      // console.log(parseImgurImageId(response.data.data.link));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    handleImageUpload().then(() => {
      // console.log("here")
      event.preventDefault();
      
      addStory && addStory(value);
      // console.log("after adding story")
      setValue("");
      setImage(null);

      if (inputFile.current) {
        inputFile.current.value = "";
        inputFile.current.type = "text";
        inputFile.current.type = "file";
    }

      // key=Math.random();
    })
  
    // handleImageUpload();
    // event.preventDefault();
    // props.addStory && props.addStory(values);
    // setValues("");
  };

  // parse input link for just the image id
  const parseImgurImageId = (imgurImageUrl) => {
    try {
      // Extract the portion after the last slash
      const parts = imgurImageUrl.split('/');
      const fileName = parts[parts.length - 1];
  
      // Remove the file extension
      const imageId = fileName.split('.')[0];
  
      return imageId;
    } catch (error) {
      // Handle any parsing errors
      console.error("Error parsing Imgur image ID:", error);
      return null;
    }
  }

  const addStory = (value) => {
    // console.log(imgId);
    const body = { content: value, imgSrc: imgId};
    // console.log("body " + value + imgId)
    // console.log("inside add Story:" + body);
    post("/api/story", body).then((story) => {
      // display this story on the screen
      // console.log("post done")
      console.log("here")
      props.addNewStory(story);
      // console.log("story entry:" + story);
    });
  };

  return (
    <div className="u-flex">
      {/* <ImgurUpload /> */}
      {/* <input
        type="text"
        placeholder={"New Image"}
        value={values.img}
        onChange={handleChange}
        name="img"
        className="NewPostInput-input"
      /> */}

      <input type="file" accept="image/*" ref={inputFile} onChange={handleImageChange} />

      <input
        type="text"
        placeholder={"New Caption"}
        value={value}
        onChange={handleChange}
        name="caption"
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
  );
};


/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 * @param {string} storyId to add comment to
 */
const NewComment = (props) => {
  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    addComment && addComment(value);
    setValue("");
  };

  const addComment = (value) => {
    const body = { parent: props.storyId, content: value };
    post("/api/comment", body).then((comment) => {
      // display this comment on the screen
      props.addNewComment(comment);
    });
  };

  return (
    <div onSubmit = {addComment} className="u-flex">
      <input
        type="text"
        placeholder={"New Comment"}
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
  );
};


export { NewComment, NewStory };