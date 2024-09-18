import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/userAction";
import { ToastCommon } from "../../components/ToastCommon";
import { LOGIN_STATUS, TOAST } from "../../store/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loginErrorMessage, loginStatus } = useSelector(
    (state) => state.loginStore
  );

  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(
      login({
        email,
        password,
      })
    );
  };

  const handleSetEmail = (value) => {
    setEmail(value);
  };

  const handleSetPassword = (value) => {
    setPassword(value);
  };

  useEffect(() => {
    if (loginErrorMessage) {
      ToastCommon(TOAST.ERROR, loginErrorMessage);
    }

    if (!loginErrorMessage && loginStatus === LOGIN_STATUS.SUCCESS) {
      navigate("/");
    }
  }, [loginErrorMessage, loginStatus]);

  return (
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
        <button
          type="button"
          className="btnLogin"
          onClick={() => handleLogin()}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
