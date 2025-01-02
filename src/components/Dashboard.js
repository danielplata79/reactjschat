import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import ChatList from "./ChatList";
import Chatbox from "./Chatbox";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  // Handle opening a chat
  const openChat = (chatId) => {
    setSelectedChat(chatId);
    window.history.pushState({ chatId }, "Chatbox");
  };

  // Handle browser back button to navigate back to the ChatList
  useEffect(() => {
    const handlePopState = () => setSelectedChat(null);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="dashboard--main-container">
      <Navbar />
      {/* ChatList Panel */}
      <div className={`dashboard--chatlist-panel ${selectedChat ? "hide" : ""}`}>
        <ChatList onSelectChat={openChat} />
      </div>
      {/* Chatbox Panel */}
      <div className={`dashboard--chatbox-panel ${selectedChat ? "show" : ""}`}>
        {selectedChat && <Chatbox chatId={selectedChat} />}
      </div>
    </div>
  );
};

export default Dashboard;

