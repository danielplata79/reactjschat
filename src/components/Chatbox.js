import React, { useEffect, useRef, useState } from "react";
import "./SendMessage.css";
import MessageBubble from "./MessageBubble";
import SendMessage from "./SendMessage";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth"
import { query, collection, orderBy, onSnapshot, limit } from "firebase/firestore";

const Chatbox = () => {
  const [user] = useAuthState(auth);

  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(130)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });

      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });

    return () => unsubscribe();
  }, []);

  if (user) {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 1000); // Delay for the next event loop tick
    }
  }

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={scrollRef} />
      </div>
      <SendMessage />
    </main>
  );
};

export default Chatbox;

