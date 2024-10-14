import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { updateUserByUser } from "../../store/actions/userAction";

function SettingUser() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authStore);
  console.log("userInfo", userInfo);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formState, setFormState] = useState({ ...userInfo, password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (formState.password !== confirmPassword) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false); // Reset error state if passwords match
    }

    try {
      if (confirm("Are you sure you want to update")) {
        // Loại bỏ trường confirmPassword, chỉ submit formState
        dispatch(updateUserByUser(formState));
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  return (
    <div className="infoUser">
      <div className="containerInfo">
        <h2>General</h2>
        <div className="row mt-4">
          <div className="col-3">Name</div>
          <div className="col-9">
            <input
              type="text"
              className="form-control widthInput py-1"
              name="name"
              value={formState.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-3">Email</div>
          <div className="col-9">
            <input
              type="text"
              className="form-control widthInput py-1"
              name="email"
              value={formState.email}
              disabled
            />
          </div>
        </div>
        <h2 className="mt-5">Password</h2>
        <div className="row mt-4">
          <div className="col-3">Password</div>
          <div className="col-9">
            <input
              type="password"
              className={`form-control widthInput py-1 ${
                passwordError ? "border-danger" : ""
              }`}
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-3 text-end">Confirm password</div>
          <div className="col-9">
            <input
              type="password"
              className={`form-control widthInput py-1 ${
                passwordError ? "border-danger" : ""
              }`}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {passwordError && (
              <small className="text-danger">
                Passwords do not match or are empty
              </small>
            )}
          </div>
        </div>
        <div className="text-center mt-5">
          <button className="btn btn-primary px-5 " onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingUser;
