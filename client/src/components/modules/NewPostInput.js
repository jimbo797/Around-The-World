import React, { useState } from "react";
import { post } from "../../utilities";

import "./NewPostInput.css";

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
 * @param {string} imgSrc imgur link
 */
const NewStory = (props) => {
  const initialValues = {
    caption: "",
    img: ""
  };

  const [values, setValues] = useState(initialValues);
  
  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    // setValues(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(values);
    setValues(initialValues);
  };

  const addStory = (value) => {
    const body = { content: value };
    post("/api/story", body).then((story) => {
      // display this story on the screen
      props.addNewStory(story);
    });
  };

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder={"New Image"}
        value={values.img}
        onChange={handleChange}
        name="img"
        className="NewPostInput-input"
      />

      <input
        type="text"
        placeholder={"New Caption"}
        value={values.caption}
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