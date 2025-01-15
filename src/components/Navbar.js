import React, { useState } from "react";
import "./Navbar.css";
import "./Login.css";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../lib/userStore";
import { useContactStore } from "../lib/contactStore";
import { useLocation } from "react-router-dom";
const Navbar = ({ activePanel }) => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { currentUser, fetchUserInfo } = useUserStore();
  const { currentContact, fetchContactInfo } = useContactStore();

  const routeTitles = {
    "/Sign-up": "Create Account//",
    "/Profile": "Profile//",
    "/Contacts": "Contacts//",
    "/NewContact": "New Contact//",
    "/ContactProfile": "Contact Profile//",
    "/Chats": "Chats//",
    "/Dashboard": "Dashboard//"
  };

  const location = useLocation();
  const currentTitle = routeTitles[location.pathname] || "OpenRChat//";

  const signOut = async () => {
    try {
      await fetchContactInfo(null);
      await fetchUserInfo(null);
      await auth.signOut();

      navigate("/Login");
      window.location.reload();
    } catch (error) {
      console.log("Error while signin out..");
    }
  }

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  }


  return (
    <nav className={`nav-bar_left ${location.pathname === "/Contacts" || "/Chats" ? "" : ""}`}>
      <span >
        <div onClick={() => navigate("/Dashboard")} className="logo-default--container">
          <img src="/logodog2.png" alt="ReactJs logo" width={50} height={50} />
        </div>
        <div className="menu-items">
          <hr />
          <button onClick={() => {
            location.pathname === "/ContactProfile" ? (
              navigate("/Dashboard")
            ) : (
              activePanel("Chats")
            )
          }} className="menu-item">
            <img src="/chat-64-white.png" alt="Profile" />
            <p>Chats</p>
          </button>
          <button onClick={() => navigate("/Dashboard")} className="menu-item">
            <img src="/group-chats-white.png" alt="Profile" />
            <p>Groups</p>
          </button>
          <button onClick={() => {
            location.pathname === "/ContactProfile" ? (
              navigate("/Dashboard") && activePanel("Contacts")
            ) : (
              activePanel("Contacts")
            )
          }} className="menu-item">
            <img src="/folder-64-white.png" alt="Profile" />
            <p>Contacts</p>
          </button>
        </div>
      </span>

      <div className="user-avatar-container" onClick={() => navigate("/Profile")}>
        <img className="user-avatar-img" src={currentUser.avatarUrl || currentUser.avatar || "/default-avatar.png"} alt="User" />
      </div>

    </nav>
  );
};
export default Navbar;
