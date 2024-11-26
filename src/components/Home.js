import React from "react";
import "./Home.css"
import { useUserStore } from "../lib/userStore"

const Home = () => {
  const { currentUser } = useUserStore();
  console.log(currentUser);

  return (
    <div className="container">
      <div className="profile--container">
        <span className="card-img--container">
          <img src="./Component 5opt4.png" className="card-img" />
        </span>
        <div className="card-info">
          <h2>{currentUser.name}</h2>
          <p>This is some text</p>
        </div>
        <div className="card-settings">
          <img src="edit.png" />
        </div>
      </div>

      <div className="chat-list--container">
        <span className="card-img--container"><img src="./Component 5opt4.png" className="card-img" /></span>
        <div className="card-info">
          <h3>Tommy Plata</h3>
          <p>This is some text</p>
        </div>
        <div className="card-settings">
          <img src="showmore.png" />
        </div>
      </div>

      <div className="chat-list--container">
        <span className="card-img--container"><img src="./Component 5opt4.png" className="card-img" /></span>
        <div className="card-info">
          <h3>Tommy Plata</h3>
          <p>This is some text</p>
        </div>
        <div className="card-settings">
          <img src="showmore.png" />
        </div>
      </div>      <div className="chat-list--container">
        <span className="card-img--container"><img src="./Component 5opt4.png" className="card-img" /></span>
        <div className="card-info">
          <h3>Tommy Plata</h3>
          <p>This is some text</p>
        </div>
        <div className="card-settings">
          <img src="showmore.png" />
        </div>
      </div>


    </div>
  )
}

export default Home;
