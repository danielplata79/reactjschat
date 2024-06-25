import React from "react";
import Footer from "./Footer"
import "./Login.css";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const token = result.user.accessToken;
      const user = result.user;

      await createUserCollection(user);
    } catch (error) {
      console.log(error);
    }
  }

  const facebookSignIn = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);

      alert("FB User: ", result.user);
    } catch (error) {
      console.log(error);
    }
  };

  const createUserCollection = async (user) => {
    const userCollectionRef = doc(db, 'users', user.uid);
    const userData = {
      email: user.email,
      name: user.displayName,
      createdAt: new Date(),
    }

    await setDoc(userCollectionRef, userData, {
      merge: true,
    })
  };

  return (
    <main id="main">
      <div className="header">
        <div className="header_content">
          <h1>Welcome to OpenRChat, Developed by Daniel Plata</h1>
          <img src="/realogo.png" alt="ReactJs logo" width={200} height={200} />
          <h2>Open-Source, Cloud Based Realtime Chat Application</h2>
        </div>
      </div>

      <div id="content">
        <div className="sign-in">
          <button className="sign-in--btn" onClick={googleSignIn}>
            <img src="/google-plus-512.png" />
            <p>Sign in with Google</p>
          </button>
          <hr />

          <button className="sign-in--btn" onClick={facebookSignIn}>
            <img src="/facebook-3-512.png" />
            <p>Sign in with Facebook</p>
          </button>
          <hr />

          <a className="sign-in--btn" href="https://github.com/danielplata79">
            <img src="/github-9-512.png" />
            <p>See my Github</p>
          </a>
        </div>
      </div>

      <Footer />
    </main >

  );
};

export default Login;
