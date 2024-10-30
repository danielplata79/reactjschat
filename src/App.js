import "./App.css";
import Navbar from "./components/Navbar";
import Chatbox from "./components/Chatbox";
import Login from "./components/Login";
import Home from "./components/Home";

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
          <Route path="/" element={!user ? <Login /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={user ? <Chatbox /> : <Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
