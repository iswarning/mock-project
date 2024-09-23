import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

function RoleUser(props) {
  const { userInfo } = useSelector((state) => state.authStore);

  return (
    <div className="infoUser">
      <h2>General</h2>
      <h2>Password</h2>
    </div>
  );
}

export default RoleUser;
