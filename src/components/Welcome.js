import React from "react";
import Footer from "./Footer";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const fbProvider = new FacebookAuthProvider();
    signInWithPopup(auth, provider); //Workaround for Firefox's Coockie enhanced protection
    signInWithPopup(auth, fbProvider);
  };

  return (
    <main className="welcome">
      <div className="header-div">
        <h2>Welcome to OpenRChat, Developed by Daniel Plata</h2>
        <img src="/realogo.png" alt="ReactJs logo" width={200} height={200} />
        <h3>Open-Source, Cloud Based Realtime Chat Application</h3>
      </div>

      <div className="sign-in-wrapper">
        <button className="sign-in-btn" onClick={googleSignIn}>
          <img src="/google-plus-512.png" width={30} />
          <p>Sign in with Google</p>
        </button>
        <hr />

        <button className="sign-in-btn" onClick={googleSignIn}>
          <img src="/facebook-3-512.png" width={30} />
          <p>Sign in with Facebook</p>
        </button>
        <hr />

        <a className="sign-in-btn" href="https://github.com/danielplata79">
          <img src="/github-9-512.png" width={30} />
          <p>See my Github</p>
        </a>
      </div>
    </main>
  );
};

export default Welcome;
