import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useUserStore } from "../lib/userStore"
import { useAuthState } from "react-firebase-hooks/auth";
import "./Profile.css";
import { ReactComponent as StatusIcon } from './status2.svg';

import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { updateDoc } from "firebase/firestore";
import { storage } from "../firebase";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [user] = useAuthState(auth);
  const { currentUser } = useUserStore();
  const [profileImg, setProfileImg] = useState(null);


  const updateAvatar = async (e) => {

    try {
      const imageFile = e.target.files[0];

      const userDocRef = doc(db, "users", currentUser.id);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      const newAvatarPath = `avatars/${currentUser.id}/${imageFile.name}`;
      const newImageRef = ref(storage, newAvatarPath);

      if (userData.avatarPath) {
        const oldProfilePicRef = ref(storage, userData.avatarPath);
        deleteObject(oldProfilePicRef);
      }

      await uploadBytes(newImageRef, imageFile);

      const newAvatarUrl = await getDownloadURL(newImageRef);

      await updateDoc(userDocRef, {
        avatarUrl: newAvatarUrl,
        avatarPath: newAvatarPath
      });

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="profile-component--container">
      <div className="profile-component--img">
        <span>
          <img src={currentUser.avatarUrl || currentUser.avatar || "/guest-500.png"} />
          <span className="upload-image">
            <input type="file"
              onChange={(e) => {
                updateAvatar(e)
              }
              } />
            <img src="./img.png" alt="img" />
          </span>
        </span>

      </div >
      <div className="profile-component--info">
        <h1>{currentUser.name}</h1>
        <div className="profile-component--info-data">
          <span>
            <span><StatusIcon style={{ fill: '#80D999', height: '30px', width: '30px' }} /> </span>
            <p><strong className="strong--txt">Status: </strong> {currentUser.status}</p>
          </span>
          <span>
            <span><img src="./email.png" alt="email" /></span>
            <p><strong className="strong--txt">Email: </strong> {currentUser.email}</p>
          </span>
          <span>
            <span><img src="./numsign.png" alt="codetag" /></span>
            <p><strong className="strong--txt">CodeTag: </strong> {currentUser.codetag} </p>
          </span>
          <span>
            <span><img src="./date.png" alt="date" /></span>
            <p><strong className="strong--txt">Member Since: </strong> {currentUser.createdAt.toDate().toDateString()} </p>
          </span>
        </div>
      </div>
    </div >
  )
}

export default Profile;
