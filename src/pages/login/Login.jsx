import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/actions/loginAction";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(
      login({
        email,
        password,
      }, navigate('/'))
    );
  };

  const handleSetEmail = (value) => {
    setEmail(value);
  };

  const handleSetPassword = (value) => {
    setPassword(value);
  };


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
