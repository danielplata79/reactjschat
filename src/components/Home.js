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
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };

    fetchContacts();
  }, [currentUser]);

  useEffect(() => {
    const cardInfoElements = document.querySelectorAll(".card-info p");
    cardInfoElements.forEach((el) => {
      if (el.scrollWidth > el.clientWidth) {
        el.style.animation = "scroll-left 10s linear infinite";
      }
    });
  }, [fetchedContacts]);

  if (isLoading) return <div className="loadingstate"> <img src="/loadingspinner.gif" alt="Loading..." /> </div>;

  return (
    <div className="home--container">
      <div className=" home-search--container ">
        <input type="search" placeholder="Search in your list of contacts..." />
      </div>
      <div className="home-contacts--container">

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
          <p className="nocontacts-text">You have no contacts!.. 😶</p>
        )}
      </div>
    </div>
  );
};

export default Home;

