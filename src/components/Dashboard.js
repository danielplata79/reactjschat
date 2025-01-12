import React, { useState } from "react";
import "./Dashboard.scss";
import ChatList from "./ChatList";
import "./ChatList.scss";
import Chatbox from "./Chatbox";
import "./Chatbox.scss";
import Navbar from "./Navbar";
import Home from "./Home";

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
        <Home onSelectChat={handleSelectChat} />
      </div>

      <div className={`dashboard--chatbox-panel ${selectedChat ? "show" : "hide"}`}>
        <Chatbox onBack={handleBackToChatList} />
      </div>
    </div>
  );
};

export default Dashboard;
