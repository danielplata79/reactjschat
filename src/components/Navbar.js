import React, { useState } from "react";
import "./Navbar.css";
import "./Login.css";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../lib/userStore";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { currentUser, fetchUserInfo } = useUserStore();

  const signOut = async () => {
    try {
      await auth.signOut();

      navigate("/Login");
    } catch (error) {
      console.log("Error while signin out..");
    }
  }

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  }

  return (
    <nav className="nav-bar">
      <span onClick={() => navigate("/")} >
        <img src="/logodog2.png" alt="ReactJs logo" width={50} height={50} />
        <h1>OpenRChat//</h1>
      </span>

      {currentUser &&
        <div className="user-avatar-container" onClick={toggleDropdown}>
          <img className="user-avatar-img" src={currentUser.avatar || "/default-avatar.png"} />
          {dropdownVisible && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("/Profile")} className="dropdown-item">
                <img src="/guest-64.png" />
                <hr />
                <p>Profile</p>
              </button>
              <button >
                <img src="/settings-25-64.png" />
                <hr />
                <p>Settings</p>
              </button>
              <button onClick={() => navigate("/Home")}>
                <img src="/book-2-64.png" />
                <hr />
                <p>Home</p>
              </button>
              <button onClick={() => navigate("/Chat")}>
                <img src="/chat-2-64.png" />
                <hr />
                <p>Chats</p>
              </button>
              <button onClick={() => navigate("/NewContact")}>
                <img src="/addnewuser.png" />
                <hr />
                <p>Add Contacts</p>
              </button>
              <button onClick={signOut}>
                <img src="/account-logout-512.png" />
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
