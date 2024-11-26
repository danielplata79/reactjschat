import React from "react";
import "./NewContact.css"

const NewContact = () => {
  return (
    <div className="NewContact-container">
      <div className="main-block">

        <div className="search--container">
          <h1 id="search--title">Type User invitational Code Below!</h1>
          <input type="search" name="contact-search" id="search-input" />
          <input type="submit" value="Search" id="search-input-btn" />
        </div>

        <div className="search-results--container">
          <div className="NewContact-chat-list--container chat-list--container" >
            <span className="card-img--container"><img src="./Component 5opt4.png" className="card-img" /></span>
            <div className="card-info">
              <h3>Tommy Plata</h3>
              <p>This is some text</p>
            </div>
            <div className="card-settings">
              <img src="addnewuser.png" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NewContact;
