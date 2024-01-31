import React, { useState, useEffect } from "react";
import Page from "../modules/Page";
import axios from "axios";
import { get, post } from "../../utilities.js";
import "./PlanTrip.css";

/** borrowed code from a youtube video for skeleton of this page https://www.youtube.com/watch?v=JJ9fkYX7q4A&t=2919s */

const PlanTrip = () => {
  const [message, setMessage] = useState(null);
  const [inputValue, setInput] = useState(null);
  const [previousChats, setPrevious] = useState([]);
  const [current, setCurrent] = useState(null);
  const [flag, setFlag] = useState(false);
  const [prompt, setPrompt] = useState(null);
  const [username, setUsername] = useState("")

  const getMessages = async () => {
    if (!flag) {
      alert("Please wait for a response!");
    }
    setFlag(true);
    setInput("");
    const options = {
      message: inputValue,
    };
    get("/api/getUsername").then((data) => setUsername(data.username));
    try {
      const response = await post("/api/completions", options);
      setMessage(response.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };

  const newChat = () => {
    setMessage(null);
    setInput("");
    setCurrent(null);
  };

  const handleClick = (title) => {
    setCurrent(title);
    setMessage(null);
    setInput("");
  };

  useEffect(() => {
    if (!current && prompt && message) {
      setCurrent(prompt);
    }
    if (current && prompt && message) {
      setPrevious((prevChats) => [
        ...prevChats,
        {
          title: current,
          role: username,
          content: prompt,
        },
        {
          title: current,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, current]);

  const handleChangeInput = (e) => {
    setInput(e.target.value);
    setPrompt(e.target.value);
  };

  const currentChat = previousChats.filter((prevchat) => prevchat.title === current);
  const uniqueTitles = Array.from(new Set(previousChats.map((prevchat) => prevchat.title)));

  return (
    <Page>
      <div className="background">
        <section className="chat-side-bar">
          <button onClick={newChat}>New Trip</button>
          <ul className="past-trips">
            {uniqueTitles?.map((title, index) => (
              <li key={index} onClick={() => handleClick(title)}>
                {title}
              </li>
            ))}
          </ul>
          <nav>
            <p>Around the World</p>
          </nav>
        </section>
        <section className="main">
          {!current && <h1 style={{color: "white"}}> Plan a Trip </h1>}
          <ul className="feed">
            {currentChat?.map((chat, index) => (
              <li key={index}>
                <p className="role">{chat.role}</p>
                <p>{chat.content}</p>
              </li>
            ))}
          </ul>
          <div className="bottom">
            <div className="input">
              <input style={{backgroundColor: "white"}} placeholder="Ask questions about your next trip!" value={inputValue} onChange={(e) => handleChangeInput(e)} />
              <div id="submit" onClick={getMessages}>
                ✈
              </div>
            </div>
            <p className="information">
              We hope planning your next adventure is made easier with Around the World.
            </p>
          </div>
        </section>
      </div>
    </Page>
  );
};

export default PlanTrip;
