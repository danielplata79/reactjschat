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
          {!user ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/chat" element={<Chatbox />} />
              <Route path="*" element={<Navigate to="/chat" />} />
            </>
          )
          }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
