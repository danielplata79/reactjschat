import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
          console.log("user data: " + JSON.stringify(userDoc.data()))
        }
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <p>Loading Profile...</p>;
  }

  return (
    <div className="container">
      <div className="profile">
        <span className="profile-img">
          <img src={user.photoURL} />
        </span>
        <div className="profile-info">
          <p><strong>Username: </strong> {userData.name}</p>
          <p><strong>Status: </strong> Here should be your status..</p>
          <p><strong>Email: </strong> {userData.email}</p>
          <p><strong>Key: </strong> {userData.profileKey}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile;
