import React from "react";
import UserDashboard from "./UserDashboard";
import { useSelector } from "react-redux";
import RoleUser from "./RoleUser";
import Loading from "../../components/Loading";

function Dashboard(props) {
  const { userInfo } = useSelector((state) => state.authStore);
  const { isLoading } = useSelector((state) => state.appStore);

  if (isLoading) return <Loading />;

  return <>{Number(userInfo.role) === 1 ? <UserDashboard /> : <RoleUser />}</>;
}

export default Dashboard;
