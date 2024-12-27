import React from "react";
import "./Dashboard.css"
import ChatList from "./ChatList";
import Chatbox from "./Chatbox";
import Navbar from "./Navbar";

const Dashboard = () => {

  return (
    <div className="dashboard--main-container">
      <Navbar />
      <div className="dashboard--chatlist-panel">
        <ChatList />
      </div>
      <div className="dashboard--chatbox-panel">
        <Chatbox />
      </div>
    </div>

  )

}

export default Dashboard;
