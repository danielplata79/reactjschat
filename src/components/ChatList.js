import React, { useEffect, useState } from "react";
import { useUserStore } from "../lib/userStore";
import { useContactStore } from "../lib/contactStore";
import { doc, getDoc, collection, onSnapshot } from "firebase/firestore";
import Fuse from "fuse.js";
import { db } from "../firebase";

const ChatList = ({ onSelectChat }) => {
  const { currentUser } = useUserStore();
  const { fetchContactInfo } = useContactStore();
  const [fetchedChats, setFetchedChats] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeChatId, setActiveChatId] = useState(null); // Track active chat

  useEffect(() => {
    if (!currentUser?.id) return;

    const userRef = collection(db, "users", currentUser.id, "privates");

    // Real-time listener for chat updates
    const unsubscribe = onSnapshot(userRef, async (userSnapshot) => {
      const chatDataPromises = userSnapshot.docs.map(async (chatDoc) => {
        const chatData = chatDoc.data();

        // Fetch contact details
        const contactRef = doc(db, "users", chatData.contactId);
        const contactDoc = await getDoc(contactRef);
        const contactData = contactDoc.data();

        // Fetch chat details in real-time
        const chatDetailsRef = doc(db, "chats", chatData.chatId);
        const chatDetailsSnapshot = await getDoc(chatDetailsRef);
        const chatDetailsData = chatDetailsSnapshot.data();

        // Ensure message status is stored per user
        const userMessageStatus = chatDetailsData?.messageStatus?.[currentUser.id] || {
          messageCounter: 0,
          messageSeen: true,
        };

        return {
          chatId: chatData.chatId,
          contactId: contactData.id,
          ...chatData,
          avatarUrl: contactData.avatarUrl,
          avatar: contactData.avatar,
          lastMessage: chatDetailsData.lastMessage,
          messageStatus: userMessageStatus,
          createdAt: chatDetailsData.createdAt,
        };
      });

      const resolvedChats = await Promise.all(chatDataPromises);
      setFetchedChats(resolvedChats);
      setSearchResults(resolvedChats);
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener when unmounting
  }, [currentUser.id]);

  // Fuse.js for searching contacts
  const fuse = new Fuse(searchResults, {
    keys: ["name", "email"],
    threshold: 0.3,
  });

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchResults(query.trim() === "" ? fetchedChats : fuse.search(query).map((result) => result.item));
  };

  const handleChat = async (chatInfo) => {
    await fetchContactInfo(chatInfo.contactId, chatInfo.chatId);
    setActiveChatId(chatInfo.chatId); // Set active chat
    onSelectChat(chatInfo.chatId); // Open chat in UI
  };

  useEffect(() => {
    // Animates long text
    const cardInfoElements = document.querySelectorAll(".card-info p");
    cardInfoElements.forEach((el) => {
      if (el.scrollWidth > el.clientWidth) {
        el.style.animation = "scroll-left 10s linear infinite";
      }
    });
  }, [searchResults]);

  if (isLoading)
    return (
      <div className="loadingstate">
        <img src="/loadingspinner.gif" alt="Loading..." />
      </div>
    );

  return (
    <div className="home--container">
      <div className="home-search--container">
        <div>
          <h1>Messages</h1>
          <span>
            <button><img src="./menu-vertical-30.png" alt="More" /></button>
          </span>
        </div>
        <span>
          <input
            type="search"
            onChange={handleSearch}
            placeholder="Search in your list of contacts..."
          />
        </span>
      </div>
      <div className="home-contacts--container">
        {searchResults.length > 0 ? (
          searchResults.map((chatInfo) => (
            <div
              onClick={() => handleChat(chatInfo)}
              className={`chat-list--container ${activeChatId === chatInfo.chatId ? "_active" : ""}`}
              key={chatInfo.chatId}
            >
              <span className="card-img--container">
                <img
                  src={chatInfo.avatarUrl || chatInfo.avatar || "./default-avatar.png"}
                  className="card-img"
                  alt="Contact"
                />
              </span>
              <div className="card-info">
                <h5>{chatInfo.name}</h5>
                <p>{chatInfo.lastMessage}</p>
              </div>
              <div className="card-info card-info-details">
                {
                  chatInfo.createdAt && (
                    <h4>{chatInfo.createdAt.toDate().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) || ""}</h4>
                  )}
                <p>{chatInfo.messageStatus.messageCounter}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-contacts--container">
            <img src="dust-68-white.png" alt="nocontacts" />
            <p className="nocontacts-text">No Chats found!.. 😶</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;

