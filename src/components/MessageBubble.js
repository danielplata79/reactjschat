import React, { useState } from "react";
import "./MessageBubble.css";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import FullScreenImg from "./FullScreenImg";
import { useUserStore } from "../lib/userStore";

const MessageBubble = ({ message }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { currentUser } = useUserStore();
  const [user] = useAuthState(auth);

  const handleImgClick = () => {
    setIsFullScreen(true);
  }

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  }

  return (
    <>
      {currentUser &&
        <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
          <img className="chat-bubble__left" src={message.avatar} referrerPolicy="no-referrer" />
          <div className="chat-bubble__right">
            <p className="user-name"> {message.name} </p>
            <img src={message.img} className="message-img" onClick={handleImgClick} />
            <p className="user-message"> {message.text} </p>
            {message.createdAt && (
              <p>{message.createdAt.toDate().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
            )}
          </div>
        </div>

      }

      {isFullScreen && (
        <FullScreenImg src={message.img} onClose={handleCloseFullScreen} />
      )}
    </>
  );
};

export default MessageBubble;
