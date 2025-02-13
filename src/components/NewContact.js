import React, { useState } from "react";
import "./NewContact.css"
import { useUserStore } from "../lib/userStore";
import { db } from "../firebase";
import { updateDoc, setDoc, query, where, collection, getDocs, arrayUnion } from "firebase/firestore";
import { ref } from "firebase/storage";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import Navbar from "./Navbar";


const NewContact = () => {
  const { currentUser } = useUserStore();
  const [searchUser, setSearchUser] = useState("");
  const [searchResultData, setSearchResultData] = useState(null);
  const [newUser, setNewUser] = useState(null);

  const fetchNewContactData = async () => {
    const codeTagRef = collection(db, "users");
    const q = query(codeTagRef, where("codetag", "==", searchUser));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No CodeTag found..");
    }

    const result = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    })
    setSearchResultData(result);
  }

  const handleAddUser = async () => {
    const userRef = doc(db, "users", currentUser.id);
    const selectedUser = searchResultData[0];
    const contactRef = doc(db, "users", selectedUser.id);

    try {
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userContacts = userData.contacts || [];

        if (userContacts.includes(selectedUser.id)) {
          console.log(`User already added in your friend list! ${userContacts}`);
        }
      } else {
        console.log(`User not found`);;
      }

      await updateDoc(userRef, {
        contacts: arrayUnion(selectedUser.id),
      });

      await updateDoc(contactRef, {
        contacts: arrayUnion(currentUser.id),
      });

      console.log(`Adding ${selectedUser.id} to your friend list!`);

    } catch (err) { console.log(err) }
  }

  return (
    <div className="NewContact-container">

      <Navbar />
      <div className="main-block">

        <div className="search--container">
          <h1>Type User invitational Code Below!</h1>

          <span>
            <input type="search" placeholder={`Example: ${currentUser.name}#3322 `} name="contact-search" id="search-input" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />

            <button type="submit" id="search-input-btn" onClick={fetchNewContactData} >Search</button>
          </span>
        </div>

        <>
          <div className="search-results--container">
            {searchResultData && searchResultData.map((newuser, index) => (
              <div className="NewContact-chat-list--container chat-list--container" key={newuser.id} >
                <span className="card-img--container"><img alt="User" src={newuser.avatar || "./Component 5opt4.png"} className="card-img" /></span>
                <div className="card-info">
                  <h3>{newuser.name}</h3>
                  <p>Disponible</p>
                </div>
                <div className="card-settings">
                  <button onClick={handleAddUser}>
                    <img src="addnewuser2.png" alt="add" />
                  </button>
                </div>
              </div>
            ))
            }
          </div>

        </>
      </div>
    </div >
  )
}

export default NewContact;
