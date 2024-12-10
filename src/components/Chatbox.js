import React, { useEffect, useRef, useState } from "react";
import "./SendMessage.css";
import MessageBubble from "./MessageBubble";
import SendMessage from "./SendMessage";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, orderBy, onSnapshot, limit } from "firebase/firestore";
import { useUserStore } from "../lib/userStore";

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  const { currentUser } = useUserStore();
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Scroll to the bottom whenever messages change or a new message arrives
    if (currentUser && scrollRef.current) {
      const timer = setTimeout(() => {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup to avoid memory leaks
    }

  }, [messages, currentUser]); // Dependencies: messages and user



  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {loading ? (
          <div className="loadingstate">
            <img src="/loadingspinner.gif" alt="Loading..." />
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={scrollRef}></div>
          </>
        )}
      </div>
      <SendMessage />
    </main>
  );

};

export default Chatbox;

