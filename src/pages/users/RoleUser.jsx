import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

function RoleUser(props) {
  const { userInfo, userList } = useSelector((state) => state.authStore);

  console.log("userList", userList);
  console.log("userInfo", userInfo);

  return (
    <div className="infoUser">
      <div className="containerInfo">
        <h2>General</h2>
        <div className="row mt-4">
          <div className="col-3">Name</div>
          <div className="col-9">
            <input type="text" className="form-control w-50 py-2" name="name" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-3">Email</div>
          <div className="col-9">
            <input
              type="text"
              className="form-control w-50 py-2"
              name="email"
            />
          </div>
        </div>
      </div>
      <button className="btn btn-primary">Submit</button>
    </div>
  );
}

export default RoleUser;
