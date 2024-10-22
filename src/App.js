import "./App.css";
import Navbar from "./components/Navbar";
import Chatbox from "./components/Chatbox";
import Login from "./components/Login";
import Home from "./components/Home";

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Navbar />

      {!user ? <Login /> : <Chatbox />}
    </div>
  );
}

export default App;
