import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { updateUserByUser } from "../../store/actions/userAction";
import { REQUIRE_PASSWORD } from "../../common/messageError";
import avatarDefault from "../../assets/avatarUser.png";
import { ToastCommon } from "../../components/ToastCommon";
import { TOAST } from "../../common/constants";

function SettingUser() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authStore);
  const { listUser } = useSelector((state) => state.userStore);
  const [passwordError, setPasswordError] = useState(false);
  const [formState, setFormState] = useState({ ...userInfo, password: "" });
  const [toggleUpdatePassword, setToggleUpdatePassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTogglePassword = (checked) => {
    setToggleUpdatePassword(checked);
  };

  const handleSubmit = () => {
    if (toggleUpdatePassword && formState.password.length === 0) {
      console.log(444);

      setErrorMessages({ password: REQUIRE_PASSWORD });
      return;
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

  const getAvatarUrl = () => {
    if (formState.avarta) {
      if (typeof formState.avarta === "string") {
        return formState.avarta;
      } else {
        return URL.createObjectURL(formState.avarta);
      }
    } else {
      return avatarDefault;
    }
  };

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpg", "image/png", "image/jpeg"].includes(file.type)) {
        ToastCommon(TOAST.ERROR, "File type invalid");
        return;
      } else {
        setFormState({
          ...formState,
          avarta: file,
        });
      }
    }
  };

  const handleAttachFile = () => {
    document.getElementById("input-upload").click();
  };

  const handleRemoveFile = () => {
    if (userInfo.avarta && userInfo.avarta.length > 0) {
      ToastCommon(
        TOAST.ERROR,
        "Cannot set avatar as default after updating avatar"
      );
      return;
    }
    setFormState({
      ...formState,
      avarta: null,
    });
  };

  return (
    <div className="infoUser">
      <div className="containerInfo">
        <h2>Change avatar</h2>
        <div className="row mt-4">
          <div className="col-3 mb-2">
            <img
              id="avatar-edit"
              src={getAvatarUrl()}
              className="rounded-circle w-100 h-100"
              alt="example placeholder"
            />
            <input
              accept="image/*"
              type="file"
              onChange={(e) => handleChangeAvatar(e)}
              id="input-upload"
              className="d-none"
            />
          </div>
          <div className="col-9">
            <button
              className="btn btn-outline-primary "
              onClick={handleAttachFile}
            >
              <i className="fa-solid fa-paperclip"></i> &nbsp; Change picture
            </button>
            <br />
            <button
              className=" btn btn-outline-danger mt-3"
              onClick={handleRemoveFile}
            >
              <i className="fa-solid fa-xmark"></i> &nbsp; Delete picture
            </button>
          </div>
          <h2 className="mt-5">General</h2>
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
        <h2 className="mt-5">
          <div className="form-check form-switch">
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Update New Password
            </label>
            <input
              className="form-check-input cursor-pointer"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={toggleUpdatePassword}
              onChange={(e) => handleTogglePassword(e.target.checked)}
            />
          </div>
        </h2>
        <div className="row mt-4">
          {toggleUpdatePassword && (
            <>
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
            </>
          )}
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
