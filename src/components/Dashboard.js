
import React, { useState } from "react";
import "./Dashboard.css";
import ChatList from "./ChatList";
import Chatbox from "./Chatbox";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId); // Show Chatbox
  };

  const handleBackToChatList = () => {
    setSelectedChat(null); // Show ChatList
  };

  return (
    <div className="dashboard--main-container">
      {/* Conditionally render Navbar */}
      {!selectedChat && <Navbar />}

      <div className={`dashboard--chatlist-panel ${selectedChat ? "hide" : "show"}`}>
        <ChatList onSelectChat={handleSelectChat} />
      </div>

      <div className={`dashboard--chatbox-panel ${selectedChat ? "show" : "hide"}`}>
        <Chatbox onBack={handleBackToChatList} />
      </div>
    </div>
  );
};

export default Dashboard;
