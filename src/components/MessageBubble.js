import React, { useState } from "react";
import "./MessageBubble.css";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import FullScreenImg from "./FullScreenImg";

const MessageBubble = ({ message }) => {
  const [user] = useAuthState(auth);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleImgClick = () => {
    setIsFullScreen(true);
  }

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  }


  return (
    <>
      <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
        <img className="chat-bubble__left" src={message.avatar} alt="img avatar" referrerPolicy="no-referrer" />
        <div className="chat-bubble__right">
          <p className="user-name"> {message.name} </p>
          <img src={message.img} className="message-img" onClick={handleImgClick} />
          <p className="user-message"> {message.text} </p>
          {message.createdAt && (
            <p>{message.createdAt.toDate().toDateString()}</p>
          )}
        </div>
      </div>

      {isFullScreen && (
        <FullScreenImg src={message.img} onClose={handleCloseFullScreen} />
      )}
    </>
  );
};

export default MessageBubble;
