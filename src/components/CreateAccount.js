import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import "./Login.css";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");

  const createNewUser = (e) => {
    e.preventDefault();
    setAlert("");

    if (password !== confirmPassword) {
      setAlert("Passwords do not match");
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      setAlert("User Created Succesfully!");
    }).catch((error) => {
      if (error.code === "auth/weak-password") {
        setAlert("Password is Weak");
      } if (error.code === "auth/email-already-in-use") {
        setAlert("Email already in use");
      } if (error.code === "auth/invalid-email") {
        setAlert("Invalid Email");
      }
      console.log(error.code);
    })
  }

  return (
    <main id="main">
      <div id="content">
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
