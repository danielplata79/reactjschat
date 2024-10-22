import React from "react";
import Footer from "./Footer"
import "./Login.css";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Login = () => {

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const userDocRef = doc(db, "users, users.uid");
      const userDoc = await getDoc(userDocRef);


      if (!userDoc.exists()) {
        await setDoc(doc(db, "users, users.uid"), {
          email: user.email,
          name: user.displayName,
          createdAt: new Date(),
        });

        await createUserCollection(user);

      } else {
        alert("User Already Exists");
      }
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
      <div id="content">
        <div className="sign-in">
          <button className="sign-in--btn" onClick={googleSignIn}>
            <img src="/google-plus-512.png" />
            <p>Continue with Google</p>
          </button>
          <hr />

          <button className="sign-in--btn" onClick={facebookSignIn}>
            <img src="/facebook-3-512.png" />
            <p>Continue with Facebook</p>
          </button>
          <hr />

        </div>
      </div>
    </main >

  );
};

export default Login;
