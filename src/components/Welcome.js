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
      <div className="header-div">
        <h2>Welcome to OpenRChat, Developed by Daniel Plata</h2>
        <img src="/realogo.png" alt="ReactJs logo" width={200} height={200} />
        <h3>Open-Source, Web-based Realtime Chat Application</h3>
      </div>

      <div className="sign-in-wrapper">
        <button className="sign-in-google" onClick={googleSignIn}>
          <img src="/google-plus-512.png" width={30} />
          <p>Sign in with Google</p>
        </button>
        <hr />
        <a className="sign-in-google" href="https://github.com/danielplata79">
          <img src="/github-9-512.png" width={30} />
          <p>See my Github</p>
        </a>
      </div>
    </main>
  );
};

export default Welcome;
