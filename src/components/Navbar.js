import React, { useState } from "react";
import "./Navbar.css";
import "./Login.css";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signOut = () => {
    auth.signOut();
    navigate("/login");
  };

  const goHome = () => {
    navigate("/");
  }

  return (
    <nav className="nav-bar">
      <span onClick={goHome} >
        <img src="/logodog2.png" alt="ReactJs logo" width={50} height={50} />
        <h1>OpenRChat//</h1>
      </span>
      {user ? (
        <button onClick={signOut} className="sign-in--btn" type="button">
          <img src="/account-logout-512.png" width={20} />
          <p>Sign Out</p>
        </button>
      ) : (
        <div></div>


      )}
    </nav>
  );
};
export default Navbar;
