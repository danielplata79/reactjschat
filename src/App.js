import "./App.css";
import Navbar from "./components/Navbar";
import Chatbox from "./components/Chatbox";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Profile from "./components/Profile";
import Contacts from "./components/Contacts";

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {!user ? (
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
