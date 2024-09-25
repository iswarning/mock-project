import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../config/axios-config";
import "./style.scss";
import { getAllUser, updateUserInfo } from "../../store/actions/authAction";

function RoleUser(props) {
  const { userInfo, userList } = useSelector((state) => state.authStore);
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
  });
  console.log("userList", userList);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const resp = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL}/api/user`
        );
        const filteredData = resp.data.filter(
          (user) => user.email === userInfo.email
        );
        if (filteredData.length > 0) {
          setFormState(filteredData[0]); // Assuming only one match
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [userInfo.email]);

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

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
      await dispatch(updateUserInfo(formState));
      window.confirm("User information updated successfully!");
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
              className="form-control w-50 py-2"
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
              className="form-control w-50 py-2"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default RoleUser;
