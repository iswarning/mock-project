import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { updateUserByUser } from "../../store/actions/userAction";
import { SET_USER_INFO } from "../../store/constants";

function RoleUser(props) {
  const { listUser } = useSelector((state) => state.userStore);
  const { userInfo } = useSelector((state) => state.authStore);
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    ...userInfo,
    name: localStorage.getItem("userName") || userInfo.name,
  });
  console.log(listUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Dispatch action to update user information
      await dispatch(updateUserByUser(formState));

      dispatch({
        type: SET_USER_INFO,
        payload: formState,
      });
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
              className="form-control widthInput py-2"
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
              className="form-control widthInput py-2"
              name="email"
              value={formState.email}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-primary px-5 py-2" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default RoleUser;
