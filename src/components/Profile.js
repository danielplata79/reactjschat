import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useUserStore } from "../lib/userStore"
import { useAuthState } from "react-firebase-hooks/auth";
import "./Profile.css";
import { ReactComponent as StatusIcon } from './status2.svg';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [user] = useAuthState(auth);
  const { currentUser } = useUserStore();
  const { profileImg, setProfileImg } = useState();

  const handleChangeImg = async () => {
  }

  return (
    <div className="profile-component--container">
      <div className="profile-component--img">
        <span>
          <img src={currentUser.avatar || "/guest-500.png"} />
          <button onClick={handleChangeImg}><img src="./img.png" /></button>
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
            <span><img src="./email.png" /></span>
            <p><strong className="strong--txt">Email: </strong> {currentUser.email}</p>
          </span>
          <span>
            <span><img src="./numsign.png" /></span>
            <p><strong className="strong--txt">CodeTag: </strong>{currentUser.codetag} </p>
          </span>
          <span>
            <span><img src="./date.png" /></span>
            <p><strong className="strong--txt">MemberSince: </strong>{currentUser.createdAt.toDate().toDateString()} </p>
          </span>
        </div>
      </div>
    </div >
  )
}

export default Profile;
