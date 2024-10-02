import { useRef } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/actions/authAction";

// eslint-disable-next-line react/prop-types
function SignUp() {
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const name = useRef(null);

  const handleSignUp = async () => {
    dispatch(
      signUp({
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
      })
    );
  };

  return (
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
          ref={name}
        />
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
        <input
          className="inputLogin"
          type="password"
          name="pswd"
          placeholder="Confirm Password"
          ref={confirmPassword}
        />
        <button
          type="button"
          className="btnLogin btnLoginSubmit"
          onClick={() => handleSignUp()}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
