import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import RoleUser from "./RoleUser";
import Loading from "../../components/Loading";
import {
  getListTask,
  getListTaskByUserId,
} from "../../store/actions/taskAction";
import { getListUser } from "../../store/actions/userAction";
import { getProjectsData } from "../../store/actions/projectAction";
import { useDispatch } from "react-redux";
import RoleAdmin from "./RoleAdmin";

function Dashboard(props) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authStore);
  const { isLoading } = useSelector((state) => state.appStore);

  useEffect(() => {
    if (Number(userInfo.role) === 1) {
      dispatch(getListTask());
    } else {
      dispatch(getListTaskByUserId({ userId: userInfo.id }));
    }
    dispatch(getListUser());
    dispatch(getProjectsData());
  }, []);

  if (isLoading) return <Loading />;

  return <>{Number(userInfo.role) === 1 ? <RoleAdmin /> : <RoleUser />}</>;
}

export default Dashboard;
