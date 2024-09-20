import { useState } from "react";
import { useDispatch } from "react-redux";
import { TOAST } from "../../common/constants";
import { validateEmail } from "../../common/validate";
import { ToastCommon } from "../../components/ToastCommon";
import { signUp } from "../../store/actions/registerAction";

// eslint-disable-next-line react/prop-types
function SignUp({ showSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSignUp = () => {
    // validate
    if (!validateEmail(email)) {
      ToastCommon(TOAST.ERROR, "Invalid email");
      return;
    }

    if (password.length < 6) {
      ToastCommon(TOAST.ERROR, "Password at least 6 characters");
      return;
    }

    if (confirmPassword !== password) {
      ToastCommon(TOAST.ERROR, "Confirm Password not match");
      return;
    }

    dispatch(
      signUp({
        name,
        email,
        password,
        role: "0",
      }, showSignUp())
    );
  };

  const handleSetEmail = (value) => {
    setEmail(value);
  };

  const handleSetPassword = (value) => {
    setPassword(value);
  };

  const handleSetConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const handleSetName = (value) => {
    setName(value);
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
        <button
          type="button"
          className="btnLogin"
          onClick={() => handleSignUp()}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
