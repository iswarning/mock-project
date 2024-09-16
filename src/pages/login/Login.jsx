import React from "react";
import "./style.css";

const Login = () => {
  return (
    <div className="containerLogin">
      <div className="mainLogin">
        <input
          className="inputLogin"
          type="checkbox"
          id="chk"
          aria-hidden="true"
        />
        <div className="login">
          <form>
            <label className="labelLogin" htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              className="inputLogin"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="inputLogin"
              type="password"
              name="pswd"
              placeholder="Password"
            />
            <button className="btnLogin">Login</button>
          </form>
        </div>
        <div className="signUp">
          <form>
            <label className="labelLogin" htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              className="inputLogin"
              type="text"
              name="txt"
              placeholder="User name"
            />
            <input
              className="inputLogin"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="inputLogin"
              type="password"
              name="pswd"
              placeholder="Password"
            />
            <button className="btnLogin">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
