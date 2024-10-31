import React, { useState } from "react";
import Footer from "./Footer"
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { getAuth, signInWithUserAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const signInEmailAndPassword = (e) => {
    e.preventDefault();
    setAlert("");

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
    }).catch((error) => {
      if (error.code) {
        setAlert("Invalid Email or Password");
      }
    })
  }

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const userDocRef = doc(db, "users, users.uid");
      const userDoc = await getDoc(userDocRef);

      navigate("/chat");

      if (!userDoc.exists()) {
        await setDoc(doc(db, "users, users.uid"), {
          email: user.email,
          name: user.displayName,
          createdAt: new Date(),
        });

        await createUserCollection(user);

        navigate("/chat");
      }

      else {
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

  const createAccount = () => {
    navigate("/Sign-up");
  }

  return (
    <main id="main">
      <div id="content">
        <div className="sign-in">
          <img src="/logodog5.png" className="logo" />
          <h1>Sign in to OpenRChat</h1>
          <button className="sign-in--btn" onClick={googleSignIn}>
            <img src="/google-plus-5123.png" />
            <p>Continue with Google</p>
          </button>

          <button className="sign-in--btn" id="facebook-btn" onClick={facebookSignIn}>
            <img src="/facebook-4-64.ico" />
            <p>Continue with Facebook</p>
          </button>
          <p id="or-text">or</p>

          <form>
            <input name="email" type="text" placeholder="Email" className="sign-in--input" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input name="Password" type="password" placeholder="Password" className="sign-in--input" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button id="submit-btn-login" type="submit" className="sign-in--btn" onClick={signInEmailAndPassword}>Log in </button>
          </form>

          <hr />

          <button className="sign-in--btn" id="create-account-btn" onClick={createAccount} >
            <p>Create Account</p>
          </button>

          {alert && <p className="alert-error">{alert}</p>}
        </div>
      </div>
    </main >
  );
};

export default Login;
