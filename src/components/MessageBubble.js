import React from "react";
import "./MessageBubble.css";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const MessageBubble = ({ message }) => {
  const [user] = useAuthState(auth);

  return (
    <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <img className="chat-bubble__left" src={message.avatar} alt="img avatar" referrerPolicy="no-referrer" />
      <div className="chat-bubble__right">
        <p className="user-name"> {message.name} </p>
        <img src={message.img} />
        <p className="user-message"> {message.text} </p>
        <p>{message.createdAt.toDate().toDateString()}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
