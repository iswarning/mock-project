import { useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { login, signUp } from "../../store/actions/userAction";
import { validateEmail } from "../../common/validate";

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {

    // validate
    if (email.length === 0) {
      //
      return
    }

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

  const handleSetEmail = () => {
    setEmail(email)
  }

  const handleSetPassword = () => {
    setPassword(password)
  }

  return (
    <div className="containerLogin">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="login">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input type="email" name="email" placeholder="Email" required onChange={(e) => handleSetEmail(e.target.value)} />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              required
            />
            <button onClick={() => handleLogin()}>Login</button>
          </form>
        </div>
        <div className="signUp">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input type="text" name="txt" placeholder="User name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              required
              onChange={(e) => handleSetPassword(e.target.value)}
            />
            <button onClick={() => handleSignUp()}>Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
