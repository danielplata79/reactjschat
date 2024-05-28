import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithRedirect, signInWithPopup } from "firebase/auth";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    //signInWithRedirect(auth, provider);
    signInWithPopup(auth, provider); //Workaround for Firefox's Coockie enhanced protection
  };

  return (
    <main className="welcome">
      <h2>Welcome to OpenRChat, Developed by Daniel Plata</h2>
      <img src="/realogo.png" alt="ReactJs logo" width={200} height={200} />
      <p>Open-Source, Web-based Realtime Chat Application</p>
      <button className="sign-in-google" onClick={googleSignIn}>
        <img src="/google-plus-512.png" width={30} />
        <p>Sign in with Google</p>
      </button>
    </main>
  );
};

export default Welcome;
