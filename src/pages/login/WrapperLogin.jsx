import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import "./style.css";

function WrapperLogin(props) {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="containerLogin">
      <div className="mainLogin">
        <input
          className="inputLogin"
          type="checkbox"
          id="chk"
          aria-hidden="true"
          checked={showSignUp}
          onChange={(e) => setShowSignUp(e.target.checked)}
        />
        <Login />
        <SignUp showSignUp={() => setShowSignUp(false)} />
      </div>
    </div>
  );
}

export default WrapperLogin;
