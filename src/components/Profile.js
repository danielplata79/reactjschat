import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [user] = useAuthState(auth);





  console.log("user data 2 : " + JSON.stringify(user));

  return (
    <div className="container">
      <p>hola</p>
      <div className="profile">
        <span className="profile-img">
          <img src={user.photoURL} />
        </span>
        <div className="profile-info">
          <p><strong>Username: </strong> {user.name || user.displayName}</p>
          <p><strong>Status: </strong> Here should be your status..</p>
          <p><strong>Email: </strong> {user.email}</p>
          <p><strong>Key: </strong> key</p>
        </div>
      </div>
    </div>
  )
}

export default Profile;
