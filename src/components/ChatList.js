import React, { useEffect, useState } from "react";
import "./Home.css";
import { useUserStore } from "../lib/userStore";
import { useContactStore } from "../lib/contactStore";
import { doc, addDoc, query, getDoc, collection, getDocs, where } from "firebase/firestore";
import Fuse from "fuse.js";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const { currentUser } = useUserStore();
  const { fetchContactInfo } = useContactStore();
  const [fetchedChats, setFetchedChats] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userRef = collection(db, "users", currentUser.id, "privates");
        const userDocs = await getDocs(userRef);

        const fetchPromises = [];

        userDocs.forEach(async (chatDoc) => {
          const chatData = chatDoc.data();

          const fetchChatPromise = (async () => {
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
              lastMessage: chatDetailsData.lastMessage
            };
          })();

          fetchPromises.push(fetchChatPromise);
        });
        const resolvedChats = await Promise.all(fetchPromises);

        setFetchedChats(resolvedChats);
        setSearchResults(resolvedChats);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }

    }
    fetchChats();
  }, [currentUser.id]);

  const fuse = new Fuse(searchResults, {
    keys: ["name", "email"],
    threshold: 0.3
  });

  const handleSearch = (e) => {
    const query = e.target.value;

    if (query.trim() === "") {
      setSearchResults(fetchedChats);
    } else {
      const results = fuse.search(query).map((result) => result.item);

      setSearchResults(results);
    }
  }

  const handleChat2 = async (chatInfo) => {
    setIsLoading(true);
    await fetchContactInfo(chatInfo.contactId, chatInfo.chatId);
    navigate("/Chat");
  }

  const handleChat = async (contact) => {

    try {
      setIsLoading(true);
      // Chat Collection reference
      const chatCollectionRef = collection(db, "chats");

      const q = query(chatCollectionRef, where("participants", "array-contains", currentUser.id));
      const chatDocs = await getDocs(q);
      let existingChat = null;
      let chatId = null;

      for (const docs of chatDocs.docs) {
        const chatSnap = docs.data();
        chatId = docs.id;
        if (chatSnap.participants.includes(contact.id)) {
          existingChat = true;
          break;
        };
      }

      if (existingChat) {
        await fetchContactInfo(contact.id, chatId);

        navigate('/Chat');
        return;
      }

      const newChatRef = await addDoc(chatCollectionRef, {
        lastMessage: "",
        timeStamp: Date.now(),
        participants: [currentUser.id, contact.id]
      })

      console.log(`Creted Chat collection document! ${newChatRef.id}`);

      // User Chat reference
      const userChatRef = collection(db, "users", currentUser.id, "privates");
      await addDoc(userChatRef, {
        chatId: newChatRef.id,
        name: contact.name,
        contactId: contact.id,
        timeStamp: Date.now(),
      });

      console.log(`Created User Chat collection document!`);

      // Contact Chat reference
      const contactChatRef = collection(db, "users", contact.id, "privates");
      await addDoc(contactChatRef, {
        chatId: newChatRef.id,
        name: currentUser.name,
        contactId: currentUser.id,
        timeStamp: Date.now()
      });
      console.log(`Created Contact Chat collection document!`);

      await fetchContactInfo(contact.id, chatId);

      navigate('/Chat');
    } catch (err) {
      console.log(err);
    }

  }

  useEffect(() => {
    const cardInfoElements = document.querySelectorAll(".card-info p");
    cardInfoElements.forEach((el) => {
      if (el.scrollWidth > el.clientWidth) {
        el.style.animation = "scroll-left 10s linear infinite";
      }
    });
  }, [searchResults]);

  if (isLoading) return <div className="loadingstate"> <img src="/loadingspinner.gif" alt="Loading..." /> </div>;


  return (
    <div className="home--container">
      <div className=" home-search--container ">
        <input type="search"
          onChange={handleSearch}
          placeholder="Search in your list of contacts..."
        />
      </div>
      <div className="home-contacts--container">

        {searchResults.length > 0 ? (
          searchResults.map((chatInfo) => (
            <div className="chat-list--container" key={chatInfo.chatId}>
              <span className="card-img--container">
                <span>
                  <img
                    src={chatInfo.avatarUrl || chatInfo.avatar || "./default-avatar.png"}
                    className="card-img"
                    alt="Contact"
                  />
                </span>
              </span>
              <div className="card-info">
                <h3>{chatInfo.name}</h3>
                <p>{chatInfo.lastMessage}</p>
              </div>
              <div className="card-settings">
                <button onClick={() => {
                  handleChat2(chatInfo);
                }}>
                  <img src="chat-512-white.png" alt="More" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-contacts--container">
            <img src="dust-68-white.png" alt="nocontacts" />
            <p className="nocontacts-text">No Chats found!.. 😶</p>
          </div>
        )
        }

      </div>
    </div>
  );
};

export default ChatList;
