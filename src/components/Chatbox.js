import React, { useEffect, useState, useRef } from "react";
import "./SendMessage.css";
import MessageBubble from "./MessageBubble";
import SendMessage from "./SendMessage";
import { db } from "../firebase";
import { query, collection, orderBy, onSnapshot, limit } from "firebase/firestore";

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  // Runs everytime a message is sended or deleted
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(2)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      // Creates a new empty array for store data from every message
      const fetchedMessages = [];
      // Loops through all documents (messages) on the collection and saves
      // the data on the new previous array that we have created before
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });

      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);

      console.log("fetched: " + fetchedMessages.length);
    });
    return () => unsubscribe;
  }, []);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default Chatbox;
