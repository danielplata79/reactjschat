import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = () => {
  const [message, setMessage] = useState("");

  return (
    <form className="send-message">
      <label htmlFor="messageInput" hidden> Enter Message </label>
      <input id="messageInput" name="messageInput" type="text" className="form-input__input" placeholder="Type message.." value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
