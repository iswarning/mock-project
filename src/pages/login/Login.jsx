import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { validateFormLogin } from "../../common/validate";
import axios from "axios";
import { ToastCommon } from "../../components/ToastCommon";
import { TOAST } from "../../common/constants";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // validation
      let params = {
        email: email.current.value,
        password: password.current.value,
      };
      validateFormLogin(params);

      const resp = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/login",
        params
      );

      if (resp) {
        localStorage.setItem("access_token", resp.data.access_token);
        localStorage.setItem("refresh_token", resp.data.refresh_token);
        navigate("/");
      }
    } catch (error) {
      ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message);
    }
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
          ref={email}
        />
        <input
          className="inputLogin"
          type="password"
          name="pswd"
          placeholder="Password"
          ref={password}
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
