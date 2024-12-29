import React, { useState } from "react";
import "./Navbar.css";
import "./Login.css";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../lib/userStore";
import { useContactStore } from "../lib/contactStore";
import { useLocation } from "react-router-dom";

const Navbar = () => {
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
    <nav className={`nav-bar_left ${location.pathname === "/Contacts" || "/Chats" ? "_red" : ""}`}>
      <span >
        {currentContact && location.pathname === "/Chat" ? (
          <>
            <div className="contact-navbar--container">
              <img className="user-avatar-img" src={currentContact.avatarUrl || currentContact.avatar || "/default-avatar.png"} alt="User" />
              <span onClick={() => navigate("/ContactProfile")}>
                <h3 >{currentContact.name}</h3>
                <p>{currentContact.status}</p>
              </span>
            </div>
          </>
        ) : location.pathname === "Groups" ? (
          <>
            <img src="/logodog2.png" alt="ReactJs logo" width={50} height={50} />
            <h1>Groups</h1>
          </>
        ) : (
          <>
            <div onClick={() => navigate("/Dashboard")} className="logo-default--container">
              <img src="/logodog2.png" alt="ReactJs logo" width={50} height={50} />
            </div>
            <div className="menu-items">
              <hr />
              <button onClick={() => navigate("/Dashboard")} className="menu-item">
                <img src="/chat-64-white.png" alt="Profile" />
                <p>Chats</p>
              </button>
              <button onClick={() => navigate("/Dashboard")} className="menu-item">
                <img src="/group-chats-white.png" alt="Profile" />
                <p>Groups</p>
              </button>
              <button onClick={() => navigate("/Contacts")} className="menu-item">
                <img src="/folder-64-white.png" alt="Profile" />
                <p>Contacts</p>
              </button>
            </div>
          </>
        )}
      </span>

      {currentUser &&
        <div className="user-avatar-container" onClick={() => navigate("/Profile")}>
          <img className="user-avatar-img" src={currentUser.avatarUrl || currentUser.avatar || "/default-avatar.png"} alt="User" />
          {dropdownVisible && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("/Profile")} className="dropdown-item">
                <img src="/guest-64.png" alt="Profile" />
                <hr />
                <p>Profile</p>
              </button>
              <button onClick={() => navigate("/Chats")}>
                <img src="/chat-2-64.png" alt="Chats" />
                <hr />
                <p>Chats</p>
              </button>
              <button onClick={() => navigate("/Contacts")}>
                <img src="/book-2-64.png" alt="Contacts" />
                <hr />
                <p>Contacts</p>
              </button>
              <button onClick={() => navigate("/NewContact")}>
                <img src="/addnewuser.png" alt="Add User" />
                <hr />
                <p>Add Contacts</p>
              </button>
              <button >
                <img src="/settings-25-64.png" alt="Settings" />
                <hr />
                <p>Settings</p>
              </button>
              <button onClick={signOut}>
                <img src="/account-logout-512.png" alt="Sign Out" />
                <hr />
                <p>Sign Out</p>
              </button>
            </div>
          )}
        </div>
      }

    </nav>
  );
};
export default Navbar;
