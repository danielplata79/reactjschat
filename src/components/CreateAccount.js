import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useUserStore } from "../lib/userStore";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

import "./Login.css";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");
  const { currentUser, fetchUserInfo } = useUserStore();

  const createNewUser = async (e) => {
    e.preventDefault();
    setAlert("");

    if (password !== confirmPassword) {
      setAlert("Passwords do not match");
      return;
    }

    // New Number Function thanks ChatGPT
    function generateUnique4Digit(existingNumbers) {
      let randomNumber;
      do {
        randomNumber = Math.floor(1000 + Math.random() * 9000);
      } while (existingNumbers.has(randomNumber));

      existingNumbers.add(randomNumber);
      return randomNumber;
    }
    const existingNumbers = new Set(); // Keep track of unique numbers
    const newNumber = generateUnique4Digit(existingNumbers);

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        email: user.email,
        id: user.uid,
        avatar: user.photoURL,
        codetag: "#" + newNumber,
        status: "Available",
        name: username,
        createdAt: new Date()
      });

      setAlert("User Created Succesfully!");
      fetchUserInfo(user.uid);
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setAlert("Password is Weak");
      } if (error.code === "auth/email-already-in-use") {
        setAlert("Email already in use");
      } if (error.code === "auth/invalid-email") {
        setAlert("Invalid Email");
      }
      console.log(error.code);
    };
  }


  return (
    <main id="main">
      <div id="login--container">
        <div className="sign-in">
          <img src="/logodog5.png" className="logo" />
          <h1>Create your OpenRChat Account</h1>
          <hr />

          <form>
            <input name="username" type="text" placeholder="User Name" className="sign-in--input" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input name="email" type="text" placeholder="Email" className="sign-in--input" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input name="password" type="password" placeholder="Password" className="sign-in--input" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input name="confirmpassword" type="password" placeholder="Confirm Password" className="sign-in--input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button id="submit-btn-login" type="submit" className="sign-in--btn" onClick={createNewUser} >Create Account</button>
          </form>
          <br />
          <br />
          {alert && <p className="alert-error">{alert}</p>}
        </div>
      </div>
    </main>
  );
}

export default CreateAccount;
