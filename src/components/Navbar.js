import React, { useState } from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider); // workaround for firefox enhanced coockie protection
  };

  const signOut = () => {
    auth.signOut();
  };


  return (
    <nav className="nav-bar">
      <span>
        <img src="/logodog.png" alt="ReactJs logo" width={50} height={50} />
        <h1>OpenRChat//</h1>
      </span>
      {user ? (
        <button onClick={signOut} className="sign-in-btn" type="button">
          <img src="/account-logout-512.png" width={30} />
          <p>Sign Out</p>
        </button>
      ) : (
        <button className="sign-in-btn" onClick={googleSignIn}>
          <img src="/google-plus-512.png" width={30} />
          <p>Sign in with Google</p>
        </button>

      )}
    </nav>
  );
};
export default Navbar;
