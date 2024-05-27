import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";

import { query, collection, orderBy, onSnapshot, limit } from "firebase/firestore";

const ChatBox = () => {
  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        <Message />
      </div>
      <SendMessage />
    </main>
  );
};

export default ChatBox;
