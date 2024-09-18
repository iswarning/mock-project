import { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { login, signUp } from "../../store/actions/userAction";
import { validateEmail } from "../../common/validate";
import { ToastCommon } from "../../components/ToastCommon";
import { LOGIN_STATUS, REGISTER_STATUS, TOAST } from "../../store/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [showSignUp, setShowSignUp] = useState(false)
  
  const dispatch = useDispatch()
  const { loginErrorMessage, loginStatus } = useSelector((state) => state.loginStore)
  const { registerErrorMessage, registerStatus } = useSelector((state) => state.registerStore)
  
  const navigate = useNavigate()

  const handleLogin = () => {
    dispatch(login({
      email,
      password
    }))
  }

  const handleSignUp = () => {
    // validate
    if (!validateEmail(email)) {
      ToastCommon(TOAST.ERROR, 'Invalid email')
      return
    }

    if (password.length < 6) {
      ToastCommon(TOAST.ERROR, 'Password at least 6 characters')
      return
    }

    if (confirmPassword !== password) {
      ToastCommon(TOAST.ERROR, 'Confirm Password not match')
      return
    }

    dispatch(signUp({
      name,
      email,
      password,
      role: "0"
    }))

  }

  const handleSetEmail = (value) => {
    setEmail(value)
  }

  const handleSetPassword = (value) => {
    setPassword(value)
  }

  const handleSetConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const handleSetName = (value) => {
    setName(value)
  }

  useEffect(() => {
    
    if (loginErrorMessage) {
      ToastCommon(TOAST.ERROR, loginErrorMessage)
    }

    if (!loginErrorMessage && loginStatus === LOGIN_STATUS.SUCCESS) {
      navigate('/')
    }

  },[loginErrorMessage, loginStatus])

  useEffect(() => {
    
    if (registerErrorMessage) {
      ToastCommon(TOAST.ERROR, registerErrorMessage)
    }

    if (!registerErrorMessage && registerStatus === REGISTER_STATUS.SUCCESS) {
      setShowSignUp(false)
      ToastCommon(TOAST.SUCCESS, 'Successfully registered')
    }
  },[registerErrorMessage, registerStatus]) 

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
        <div className="login">
          <form>
            <label className="labelLogin" htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input className="inputLogin" type="email" name="email" placeholder="Email" required onChange={(e) => handleSetEmail(e.target.value)}/>
            <input
              className="inputLogin"
              type="password"
              name="pswd"
              placeholder="Password"
              required
              onChange={(e) => handleSetPassword(e.target.value)}
            />
            <button type="button" className="btnLogin" onClick={() => handleLogin()}>Login</button>
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
              name="name" 
              placeholder="Name" 
              required 
              onChange={(e) => handleSetName(e.target.value)}
            />
            <input 
              className="inputLogin" 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
              onChange={(e) => handleSetEmail(e.target.value)}
            />
            <input
              className="inputLogin"
              type="password"
              name="pswd"
              placeholder="Password"
              required
              onChange={(e) => handleSetPassword(e.target.value)}
            />
            <input
              className="inputLogin"
              type="password"
              name="pswd"
              placeholder="Confirm Password"
              required
              onChange={(e) => handleSetConfirmPassword(e.target.value)}
            />
            <button type="button" className="btnLogin" onClick={() => handleSignUp()}>Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
