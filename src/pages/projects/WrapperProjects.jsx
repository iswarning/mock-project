import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { getProjectsData } from "../../store/actions/projectAction";
import RoleAdmin from "./RoleAdmin";
import RoleUser from "./RoleUser";
import "./style.scss";

const WrapperProjects = () => {
  const { userInfo } = useSelector((state) => state.authStore);
  const { isLoading } = useSelector((state) => state.appStore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectsData());
  }, []);

  if (isLoading) return <Loading />;

  return <>{Number(userInfo?.role) == 1 ? <RoleAdmin /> : <RoleUser />}</>;
};

export default WrapperProjects;
