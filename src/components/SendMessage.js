import React, { useState } from "react";
import "./SendMessage.css";
import "./Chatbox.css";
import { auth, db, storage, uploadFile } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");
  const [img, setImg] = useState(null);

  const sendMessage = async (event) => {
    event.preventDefault();

    // Check if message input is empty


    // Get user's personal data when user log in
    const { uid, displayName, photoURL } = auth.currentUser;
    // Sending data to our Backend =>
    // Create a document inside messages collection in Firebase DB
    if (img) {
      const storageRef = ref(storage, uuidv4());
      await uploadBytes(storageRef, img);

      const url = await getDownloadURL(storageRef);
      console.log("url" + url);

      await addDoc(collection(db, "messages"), {
        name: displayName,
        avatar: photoURL,
        img: url,
        createdAt: serverTimestamp(), // Storage the time message is created
        uid,
      });

    } else {
      if (message.trim() === "") {
        alert("Enter a valid message");
        return;
      };

      await addDoc(collection(db, "messages"), {
        text: message,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid
      });
    }



    setMessage("");
    setImg(null);
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form className="send-message" onSubmit={(event) => sendMessage(event)} >
      <label htmlFor="messageInput" hidden> Enter Message </label>
      <input
        id="messageInput" name="messageInput" type="text" className="form-input__input" placeholder="Type a message.." value={message} onChange={(e) => setMessage(e.target.value)} />

      <input
        type="file"
        onChange={e => {
          setImg(e.target.files[0]);
        }}
        id="qlq"
      />

      <button type="submit">SEND</button>
    </form>
  );
};

export default SendMessage;
