import React, { useEffect, useState } from "react";
import "./SendMessage.css";
import "./Chatbox.css";
import { auth, db, storage } from "../firebase";
import { addDoc, setDoc, doc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useContactStore } from "../lib/contactStore";
import { useUserStore } from "../lib/userStore";

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");
  const [img, setImg] = useState(null);
  const { currentContact, chatId } = useContactStore();
  const { currentUser } = useUserStore();


  const sendMessage = async (event) => {
    event.preventDefault();

    // Get user's personal data when user log in
    const { uid, displayName, photoURL } = auth.currentUser;

    if (img) {
      const storageRef = ref(storage, uuidv4());
      await uploadBytes(storageRef, img);

      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "messages", chatId, "messages"), {
        name: currentUser.name,
        avatar: currentUser.avatarUrl,
        img: url,
        createdAt: serverTimestamp(), // Storage the time message is created
        uid
      });

    } else {
      if (message.trim() === "") {
        alert("Enter a valid message");
        return;
      };

      await addDoc(collection(db, "messages", chatId, "messages"), {
        text: message,
        name: currentUser.name,
        avatar: currentUser.avatarUrl,
        createdAt: serverTimestamp(),
        uid
      });

      await setDoc(doc(db, "chats", chatId), {
        lastMessage: message,
      }
      )
    };

    setMessage("");
    setImg(null);
  };

  return (
    <form className="send-message" onSubmit={(event) => sendMessage(event)} >
      <label htmlFor="messageInput" hidden> Enter Message </label>
      <input
        id="messageInput" name="messageInput" type="text" className="form-input__input" placeholder="Type a message.." value={message} onChange={(e) => setMessage(e.target.value)} />

      <span className="send-message__buttons">
        <span className="send-message__buttons__img">
          <img src="/clip-64-white.png" alt="upload-img" />
          <input type="file"
            onChange={(e) => {
              setImg(e.target.files[0])
              setMessage(e.target.files[0].name)
            }}
          />
        </span>
        <button type="submit">SEND</button>
      </span>
    </form>
  );
};

export default SendMessage;
