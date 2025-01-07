import React, { useState } from "react";
import "./Dashboard.css";
import ChatList from "./ChatList";
import "./ChatList.css";
import Chatbox from "./Chatbox";
import "./Chatbox.css";
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
      <div className={`dashboard--navbar-container ${selectedChat ? "hide-navbar" : ""}`}>
        <Navbar />
      </div>

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
