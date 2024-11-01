import React, { useState } from "react";
import "./Navbar.css";
import "./Login.css";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const signOut = () => {
    auth.signOut();
    navigate("/Login");
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

      {user && (
        <div className="user-avatar-container" onClick={toggleDropdown}>
          <img src={user.photoURL || "/default-avatar.png"} />
          {dropdownVisible && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("/Profile")} className="dropdown-item">Profile</button>
              <button onClick={signOut}>Sign Out</button>
            </div>
          )}
        </div>
      )}

    </nav>
  );
};
export default Navbar;
