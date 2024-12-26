import React from "react";
import "./Dashboard.css"
import ChatList from "./ChatList";
import Chatbox from "./Chatbox";

const Dashboard = () => {

  return (
    <div className="dashboard--main-container">
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
