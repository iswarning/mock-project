import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskByUser } from "../../store/actions/taskAction";

function RoleUser(props) {
  const dispatch = useDispatch();
  const { taskByUser } = useSelector((state) => state.taskStore);
  const { userInfo } = useSelector((state) => state.authStore);

  console.log("taskByUser", taskByUser);

  useEffect(() => {
    dispatch(getTaskByUser(userInfo.id));
  }, []);
  return <div></div>;
}

export default RoleUser;
