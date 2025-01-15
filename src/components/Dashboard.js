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
  const [selectedPanel, setSelectedPanel] = useState("");

  selectedPanel === "" && setSelectedPanel("Chats");

  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId); // Show Chatbox
  };

  const handleBackToChatList = () => {
    setSelectedChat(null); // Show ChatList
  };

  return (
    <div className="dashboard--main-container">
      <div className={`dashboard--navbar-container ${selectedChat ? "hide-navbar" : ""}`}>
        <Navbar activePanel={setSelectedPanel} />
      </div>

      <div className={`dashboard--chatlist-panel ${selectedChat ? "hide" : "show"}`}>
        <div className={`active-panel ${selectedPanel === "Chats" ? "show" : "hide"}`}>
          <ChatList onSelectChat={handleSelectChat} />
        </div>
        <div className={`active-panel ${selectedPanel === "Contacts" ? "show" : "hide"}`}>
          <Home onSelectChat={handleSelectChat} />
        </div>
      </div>

      <div className={`dashboard--chatbox-panel ${selectedChat ? "show" : "hide"}`}>
        <Chatbox onBack={handleBackToChatList} />
      </div>
    </div>
  );
};

export default Dashboard;
