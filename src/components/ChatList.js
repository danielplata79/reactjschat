import React, { useEffect, useState } from "react";
import { useUserStore } from "../lib/userStore"; import { useContactStore } from "../lib/contactStore";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
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
    const fetchChats = async () => {
      try {
        const userRef = collection(db, "users", currentUser.id, "privates");
        const userDocs = await getDocs(userRef);

        const chatDataPromises = userDocs.docs.map(async (chatDoc) => {
          const chatData = chatDoc.data();

          const contactRef = doc(db, "users", chatData.contactId);
          const contactDoc = await getDoc(contactRef);
          const contactData = contactDoc.data();

          const chatDetailsRef = doc(db, "chats", chatData.chatId);
          const chatDetailsDoc = await getDoc(chatDetailsRef);
          const chatDetailsData = chatDetailsDoc.data();

          return {
            chatId: chatDoc.id,
            contactId: contactData.id,
            ...chatData,
            avatarUrl: contactData.avatarUrl,
            avatar: contactData.avatar,
            lastMessage: chatDetailsData.lastMessage,
            createdAt: chatDetailsData.createdAt,
          };
        });
        const resolvedChats = await Promise.all(chatDataPromises);

        setFetchedChats(resolvedChats);
        setSearchResults(resolvedChats);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, [currentUser.id]);

  const fuse = new Fuse(searchResults, {
    keys: ["name", "email"],
    threshold: 0.3,
  });

  const handleSearch = (e) => {
    const query = e.target.value;

    if (query.trim() === "") {
      setSearchResults(fetchedChats);
    } else {
      const results = fuse.search(query).map((result) => result.item);
      setSearchResults(results);
    }
  };

  const handleChat = async (chatInfo) => {
    await fetchContactInfo(chatInfo.contactId, chatInfo.chatId);
    setActiveChatId(chatInfo.chatId); // Set the active chat ID
    onSelectChat(chatInfo.chatId); // Trigger the chatbox view in Dashboard
  };

  useEffect(() => {
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
            <button><img src="./showmore.png" alt="More" /></button>
            <button><img src="./showmore.png" alt="More" /></button>
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
                <h4>{chatInfo.name}</h4>
                <p>{chatInfo.lastMessage}</p>
              </div>
              <div className="card-info card-info-details">
                <h4>{chatInfo.createdAt.toDate().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) || ""}</h4>
                <p>Seen</p>
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

