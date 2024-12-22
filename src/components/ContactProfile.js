import React from "react";
import { useContactStore } from "../lib/contactStore";
import "./Profile.css";
import { ReactComponent as StatusIcon } from './status2.svg';

const Profile = () => {
  const { currentContact } = useContactStore();

  return (
    <div className="profile-component--container">
      <div className="profile-component--img">
        <span>
          <img src={currentContact.avatarUrl || currentContact.avatar || "/guest-500.png"} />
        </span>

      </div >
      <div className="profile-component--info">
        <h1>{currentContact.name}</h1>
        <div className="profile-component--info-data">
          <span>
            <span><StatusIcon style={{ fill: '#80D999', height: '30px', width: '30px' }} /> </span>
            <p><strong className="strong--txt">Status: </strong> {currentContact.status}</p>
          </span>
          <span>
            <span><img src="./email.png" alt="email" /></span>
            <p><strong className="strong--txt">Email: </strong> {currentContact.email}</p>
          </span>
          <span>
            <span><img src="./numsign.png" alt="codetag" /></span>
            <p><strong className="strong--txt">CodeTag: </strong> {currentContact.codetag} </p>
          </span>
          <span>
            <span><img src="./date.png" alt="date" /></span>
            <p><strong className="strong--txt">Member Since: </strong> {currentContact.createdAt.toDate().toDateString()} </p>
          </span>
        </div>
      </div>
    </div >
  )
}

export default Profile;
