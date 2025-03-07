import "./App.css";
import Navbar from "./components/Navbar";
import Chatbox from "./components/Chatbox";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Profile from "./components/Profile";
import Home from "./components/Home";
import NewContact from "./components/NewContact"
import ContactProfile from "./components/ContactProfile"
import ChatList from "./components/ChatList";
import Dashboard from "./components/Dashboard";

import { auth } from "./firebase";
import { useUserStore } from "../src/lib/userStore";
import { useContactStore } from "./lib/contactStore";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

function App() {
  const { currentUser, fetchUserInfo, isLoading } = useUserStore();
  const { currentContact } = useContactStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid)
      } else {
        fetchUserInfo(null);
      }
    });

    return () => {
      unSub();
    }
  }, [fetchUserInfo]);

  if (isLoading) return (
    <div className="loader-main-container">
      <span>
        <img src="./logodog2.png" />
        <h3>OpenRChat//</h3>
        <div className="loader"> </div>
      </span>
    </div>
  )

  return (
    <div className="App">
      <Router>
        <Routes>
          {currentUser === null ? (
            <>
              <Route path="/Login" element={<Login />} />
              <Route path="/Sign-up" element={<CreateAccount />} />
              <Route path="*" element={<Navigate to="/Login" />} />
            </>
          ) : (
            <>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Chat" element={<Chatbox />} />
              <Route path="/Contacts" element={<Home />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/NewContact" element={<NewContact />} />
              <Route path="/ContactProfile" element={<ContactProfile />} />
              <Route path="/Chats" element={<ChatList />} />
              <Route path="*" element={<Navigate to="/Dashboard" />} />
            </>
          )
          }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
