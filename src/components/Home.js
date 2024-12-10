import React, { useEffect, useState } from "react";
import "./Home.css";
import { useUserStore } from "../lib/userStore";
import { useContactStore } from "../lib/contactStore";
import { doc, addDoc, query, getDoc, collection, getDocs, where } from "firebase/firestore";
import Fuse from "fuse.js";
import { db } from "../firebase";

const Home = () => {
  const { currentUser } = useUserStore();
  const { currentContact, fetchContactInfo } = useContactStore();
  const [fetchedContacts, setFetchedContacts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const userRef = doc(db, "users", currentUser.id);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const contactsDetails = [];
          const userData = userDoc.data();

          for (const contactId of userData.contacts) {
            const contactRef = doc(db, "users", contactId);
            const contactDoc = await getDoc(contactRef);

            contactsDetails.push({
              id: contactId,
              ...contactDoc.data(),
            });

          }
          setFetchedContacts(contactsDetails);
          setSearchResults(contactsDetails);
        } else {
          console.log(`Error fetching user data`);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }

    }
    fetchContacts();
  }, [currentUser.id]);

  const fuse = new Fuse(searchResults, {
    keys: ["name", "email"],
    threshold: 0.3
  });

  const handleSearch = (e) => {
    const query = e.target.value;

    if (query.trim() === "") {
      setSearchResults(fetchedContacts);
    } else {
      const results = fuse.search(query).map((result) => result.item);

      setSearchResults(results);
    }
  }

  const handleChat = async (contact) => {

    try {
      // Chat Collection reference
      const chatCollectionRef = collection(db, "chats");

      const q = query(chatCollectionRef, where("participants", "array-contains", currentUser.id));
      const chatDocs = await getDocs(q);
      let existingChat = null;

      for (const docs of chatDocs.docs) {
        const chatSnap = docs.data();
        if (chatSnap.participants.includes(contact.id)) {
          existingChat = true;
          break;
        };
      }

      if (existingChat) {
        console.log(`Chat Already Exists!`);
        return;
      }

      const newChatRef = await addDoc(chatCollectionRef, {
        lastMessage: "last message",
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
          searchResults.map((contact) => (
            <div className="chat-list--container" key={contact.id}>
              <span className="card-img--container">
                <img
                  src={contact.avatarUrl || contact.avatar || "./default-avatar.png"}
                  className="card-img"
                  alt="Contact"
                />
              </span>
              <div className="card-info">
                <h3>{contact.name}</h3>
                <p>{contact.email}</p>
              </div>
              <div className="card-settings">
                <button onClick={() => {
                  handleChat(contact);
                  fetchContactInfo(contact.id)
                }}>
                  <img src="chat-512-white.png" alt="More" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-contacts--container">
            <img src="dust-68-white.png" alt="nocontacts" />
            <p className="nocontacts-text">No contacts found!.. 😶</p>
          </div>
        )
        }

      </div>
    </div>
  );
};

export default Home;
