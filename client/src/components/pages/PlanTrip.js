import React, { useState, useEffect } from "react";
import Page from "../modules/Page";
import axios from "axios";
import { get, post } from "../../utilities.js";
import "./PlanTrip.css";



const PlanTrip = () => {

  const [message, setMessage] = useState(null)
  const [inputValue, setInput] = useState(null)
  const [previousChats, setPrevious] = useState([])
  const [current, setCurrent] = useState(null)
  const [userPrompts, setPrompts] = useState([])

  const getMessages = async () =>{

    setPrompts(prevPrompts => (
      [...prevPrompts, {
      role: "user", 
      content: inputValue
    }]))
    alert("Please wait for a response!")
    const options = {
        message: inputValue
    }
    try{
      const response = await post("/api/completions", options);
      setMessage(response.choices[0].message);
    } catch(error){
      console.error(error);
    }
  }

  const newChat = () =>{
    setMessage(null);
    setInput("");
    setCurrent(null);
    setPrompts([]);
  }

  const handleClick = (title) =>{
    setCurrent(title);
    setMessage(null);
    setInput("");
  }

  useEffect(() => {

    if (!current && inputValue && message){
      setCurrent(inputValue)
    }
    if(current && inputValue && message){
      setPrevious(prevChats => (
        [...prevChats, {
          title: current,
          role: message.role,
          content: message.content
        }]
      ))
    }
  }, [message, current])

  const currentChat = previousChats.filter(prevchat => prevchat.title === current);
  const currentPrompt= userPrompts;
  const uniqueTitles = Array.from(new Set(previousChats.map(prevchat => prevchat.title)));


  return (
    <Page>
    <div className="background">
      <section className="chat-side-bar">
        <button onClick={newChat}>New Trip</button>
        <ul className="past-trips">
          {uniqueTitles?.map((title, index) => <li key={index} onClick={() => handleClick(title)}>{title}</li>)}
        </ul>
        <nav>
          <p>Around the World</p>
        </nav>
      </section>
      <section className="main">
        {!current && <h1> Plan a Trip </h1>}
        <ul className="feed">
          {currentPrompt?.map((prompt, index) => <li key={index}>
            <p className="role">{prompt.role}</p>
            <p>{prompt.content}</p>
          </li>)}
          {currentChat?.map((chat, index) => <li key={index}>
            <p className="role">{chat.role}</p>
            <p>{chat.content}</p>
          </li>)}
        </ul>
        <div className="bottom">
          <div className="input">
            <input value={inputValue} onChange= {(e) => setInput(e.target.value)}/>
            <div id="submit" onClick={getMessages}>✈</div>
          </div>
          <p className="information">
            We hope planning your next adventure is made easier with 
            Around the World.
          </p>
        </div>
      </section>
    </div>
    </Page>
  )
};

export default PlanTrip;
