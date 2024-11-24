import "./App.css";
import Navbar from "./components/Navbar";
import Chatbox from "./components/Chatbox";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Profile from "./components/Profile";
import Contacts from "./components/Contacts";

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUserStore } from "../src/lib/userStore";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

function App() {
  const [user] = useAuthState(auth);
  const { currentUser, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user.uid);
      //console.log(`user from useEffect: ${JSON.stringify(user)}`);
      console.log(`user from currentUser: ${JSON.stringify(currentUser)}`);
    });

    return () => {
      unSub();
    }
  }, [fetchUserInfo]);



  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {!currentUser ? (
            <>
              <Route path="/Login" element={<Login />} />
              <Route path="/Sign-up" element={<CreateAccount />} />
              <Route path="*" element={<Navigate to="/Login" />} />
            </>
          ) : (
            <>
              <Route path="/Chat" element={<Chatbox />} />
              <Route path="/Contacts" element={<Contacts />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/Chat" />} />
            </>
          )
          }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
