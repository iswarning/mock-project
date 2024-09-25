import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/actions/authAction';

const Login = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authStore);
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);

  const handleLogin = () => {
    dispatch(
      login({
        email: email.current.value,
        password: password.current.value,
      })
    );
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

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
      </form>
    </div>
  );
};

export default Login;
