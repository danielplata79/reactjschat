import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useUserStore } from "../lib/userStore"
import { useAuthState } from "react-firebase-hooks/auth";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [user] = useAuthState(auth);
  const { currentUser } = useUserStore();

  console.log("photoURL: ", currentUser.photoURL);

  console.log("all user: ", currentUser);

  return (
    <div className="profile-component--container">
      <div className="profile-component--main-block">
        <div className="profile-component--img">
          <span> <img src={currentUser.avatar || "/guest-500.png"} /> </span>

        </div >
        <div className="profile-component--info">
          <h2>{currentUser.name}</h2>
          <p><strong className="strong--txt">Status: </strong> {currentUser.status}</p>
          <p><strong className="strong--txt">Email: </strong> {currentUser.email}</p>
          <p><strong className="strong--txt">CodeTag: </strong>{currentUser.codetag} </p>
          <p><strong className="strong--txt">MemberSince: </strong>{currentUser.createdAt.toDate().toDateString()} </p>
        </div>
      </div>
    </div>
  )
}

export default Profile;
