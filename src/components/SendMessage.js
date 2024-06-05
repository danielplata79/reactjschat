import React, { useState } from "react";
import "./SendMessage.css";
import "./Chatbox.css";
import { auth, db, uploadFile } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");
  const [img, setImg] = useState(null);

  const sendMessage = async (event) => {
    event.preventDefault();

    // Check if message input is empty
    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    };

    // Get user's personal data when user log in
    const { uid, displayName, photoURL } = auth.currentUser;

    // Sending data to our Backend =>
    // Create a document inside messages collection in Firebase DB
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(), // Storage the time message is created
      uid,
    });

    // HandleIMG upload
    uploadFile(img);

    setMessage("");
    setImg(null);
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form className="send-message" onSubmit={(event) => sendMessage(event)} >
      <label htmlFor="messageInput" hidden> Enter Message </label>
      <input
        id="messageInput" name="messageInput" type="text" className="form-input__input" placeholder="Type a message.." value={message} onChange={(e) => setMessage(e.target.value)} />

      <input type="file" onChange={e => setImg(e.target.files[0])} onChange={e => setMessage(e.target.files[0].name)} id="qlq" />

      <button type="submit">SEND</button>
    </form>
  );
};

export default SendMessage;
