import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, loginWithGoogle } from "../../store/actions/authAction";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(
      login(
        {
          email: email.current.value,
          password: password.current.value,
        },
        () => navigate("/")
      )
    );
  };

  const handleLoginWithGoogle = () => {
    dispatch(
      loginWithGoogle(
        () => navigate("/")
      )
    );
  }

  return (
    <div className="login">
      <form>
        <label className="labelLogin" htmlFor="chk" aria-hidden="true">
          Login
        </label>
        <input className="inputLogin" type="email" name="email" placeholder="Email" ref={email} />
        <input
          className="inputLogin"
          type="password"
          name="pswd"
          placeholder="Password"
          ref={password}
        />
        <button type="button" className="btnLogin" onClick={() => handleLogin()}>
          Login
        </button>
        <button type="button" className="btnLogin" onClick={() => handleLoginWithGoogle()}>
          <i className="fa-brands fa-google"></i> Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
