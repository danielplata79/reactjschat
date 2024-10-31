import React from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const CreateAccount = () => {

  return (
    <main id="main">
      <div id="content">
        <div className="sign-in">
          <img src="/logodog5.png" className="logo" />
          <h1>Create your OpenRChat Account</h1>
          <hr />

          <form>
            <input name="user" type="text" placeholder="User Name" className="sign-in--input" />
            <input name="password" type="password" placeholder="Password" className="sign-in--input" />
            <input name="confirmpassword" type="text" placeholder="Confirm Password" className="sign-in--input" />
            <button id="submit-btn-login" type="submit" className="sign-in--btn" >Create Account</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default CreateAccount;
