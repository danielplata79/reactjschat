import React, { useState } from "react";
import "./NewContact.css"
import { useUserStore } from "../lib/userStore";
import { db } from "../firebase";
import { query, where, collection, getDocs } from "firebase/firestore";


const NewContact = () => {
  const { currentUser } = useUserStore();
  const [searchUser, setSearchUser] = useState("");
  const [searchResultData, setSearchResultData] = useState(null);

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



  console.log(`searchresultdata: ${JSON.stringify(searchResultData)}`);


  return (
    <div className="NewContact-container">
      <div className="main-block">

        <div className="search--container">
          <h1>Type User invitational Code Below!</h1>

          <span>
            <input type="search" placeholder={`Example: ${currentUser.name}#3322 `} name="contact-search" id="search-input" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />

            <button type="submit" id="search-input-btn" onClick={fetchNewContactData} >SEARCH</button>
          </span>
        </div>

        <>
          {searchResultData && searchResultData.map((newuser, index) => (
            <div className="search-results--container">
              <div className="NewContact-chat-list--container chat-list--container" key={newuser.id} >
                <span className="card-img--container"><img src={newuser.avatar || "./Component 5opt4.png"} className="card-img" /></span>
                <div className="card-info">
                  <h3>{newuser.name}</h3>
                  <p>Disponible</p>
                </div>
                <div className="card-settings">
                  <img src="addnewuser2.png" />
                </div>
              </div>
            </div>
          ))
          }
        </>
      </div>
    </div >
  )
}

export default NewContact;
