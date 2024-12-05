import React, { useEffect, useState } from "react";
import "./Home.css";
import { useUserStore } from "../lib/userStore";
import { doc, getDoc } from "firebase/firestore";
import Fuse from "fuse.js";
import { db } from "../firebase";

const Home = () => {
  const { currentUser } = useUserStore();
  const [fetchedContacts, setFetchedContacts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const userRef = doc(db, "users", currentUser.id);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const contactsDetails = [];

          for (const contactId of userData.contacts || []) {
            const contactRef = doc(db, "users", contactId);
            const contactDoc = await getDoc(contactRef);

            if (contactDoc.exists()) {
              contactsDetails.push({
                id: contactId,
                ...contactDoc.data()
              });
            }
          }

          setFetchedContacts(contactsDetails);
          setSearchResults(contactsDetails);
        }
      } catch (err) {
        console.log("error fetching contacts data..", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContacts();
  }, [currentUser.id]);

  const fuse = new Fuse(fetchedContacts, {
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

  const handleChat = (contactName) => {
    console.log(`Starting a chat with ${contactName}`);

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
        <input type="search" onChange={handleSearch} placeholder="Search in your list of contacts..." />
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
                <button onClick={() => handleChat(contact.name)}>
                  <img src="chat-512-white.png" alt="More" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="nocontacts-text">You have no contacts!.. 😶</p>
        )}
      </div>
    </div>
  );
};

export default Home;

