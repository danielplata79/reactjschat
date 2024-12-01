import React, { useEffect, useState } from "react";
import "./Home.css";
import { useUserStore } from "../lib/userStore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const { currentUser } = useUserStore();
  const [fetchedContacts, setFetchedContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const userRef = doc(db, "users", currentUser.id);
        const userDoc = await getDoc(userRef);

        const userData = userDoc.data();

        if (userData.contacts) {
          const contactDetails = [];

          for (const contactId of userData.contacts) {
            const contactRef = doc(db, "users", contactId);
            const contactSnap = await getDoc(contactRef);

            contactDetails.push({
              id: contactId,
              ...contactSnap.data(),
            });
          }

          setFetchedContacts(contactDetails);
          setIsLoading(false);
        } else {
          console.log("No contacts array found in user document.");
        }
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };

    fetchContacts();
  }, [currentUser]);

  return (
    <div className="home--container">
      <div className="profile--container">
        <span className="card-img--container">
          <img
            src={currentUser.avatarUrl}
            className="card-img"
            alt="Profile"
          />
        </span>
        <div className="card-info">
          <h2>{currentUser.name}</h2>
          <p>{currentUser.status}</p>
        </div>
        <div className="card-settings">
          <img src="edit.png" alt="Settings" />
        </div>
      </div>

      {fetchedContacts.length > 0 ? (
        fetchedContacts.map((contact) => (
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
              <img src="showmore.png" alt="More" />
            </div>
          </div>
        ))
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
};

export default Home;

