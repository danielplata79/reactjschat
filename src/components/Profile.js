import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile">
      <h1>Your Profile</h1>
      <p><strong>Username: </strong> {userData.name}</p>
      <p><strong>Email: </strong> {userData.email}</p>
      <p><strong>Key: </strong> {userData.profileKey}</p>
    </div>
  )
}

export default Profile;
