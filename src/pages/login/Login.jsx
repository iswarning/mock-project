import { useRef } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { login, signUp } from "../../store/actions/userAction";
import { validateEmail } from "../../common/validate";

const Login = () => {
  const dispatch = useDispatch()
  const email = useRef('')
  const password = useRef('')
  const rePassword = useRef('')

  const handleLogin = () => {

    // validate
    if (!validateEmail(email)) {
      //
      return
    }

    if (password.length <= 6) {
      //
      return
    }

    dispatch(login({
      email: email,
      password: password
    }))
  }

  const handleSignUp = () => {
    dispatch(signUp({
      email: email,
      password: password,
      role: 0
    }))
  }

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
            <input ref={email} className="inputLogin" type="email" name="email" placeholder="Email" required/>
            <input
              ref={password}
              className="inputLogin"
              type="password"
              name="pswd"
              placeholder="Password"
              required
            />
            <button className="btnLogin" onClick={() => handleLogin()}>Login</button>
          </form>
        </div>
        <div className="signUp">
          <form>
            <label className="labelLogin" htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input ref={email} className="inputLogin" type="email" name="email" placeholder="Email" required />
            <input
              ref={password}
              className="inputLogin"
              type="password"
              name="pswd"
              placeholder="Password"
              required
            />
            <input
              ref={rePassword}
              className="inputLogin"
              type="password"
              name="pswd"
              placeholder="Re-Password"
              required
            />
            <button className="btnLogin" onClick={() => handleSignUp()}>Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
