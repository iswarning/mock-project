/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectsByUser,
  getProjectsData,
} from "../../store/actions/projectAction";
import AdminProjects from "./AdminProjects";
import ProjectCreateModal from "./ProjectCreateModal";
import UserProjects from "./UserProjects";
import Loading from "../../components/Loading";
import "./style.scss";

const WrapperProjects = () => {
  const { userInfo } = useSelector((state) => state.authStore);
  const { isLoading } = useSelector((state) => state.appStore);
  const dispatch = useDispatch();
  const [checkRole, setCheckRole] = useState("");

  const handleCheck = (role) => {
    if (role == 1) {
      setCheckRole("admin");
    } else setCheckRole("user");
  };

  useEffect(() => {
    dispatch(getProjectsData());
  }, []);

  useEffect(() => {
    dispatch(getProjectsByUser(userInfo?.email));
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="container mt-2">
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn bgCreate px-5 py-2 text-white"
            data-bs-toggle="modal"
            data-bs-target="#projectCreateModal"
            onClick={() => handleCheck(userInfo?.role)}
          >
            <strong>Create Project</strong>
          </button>
        </div>
      </div>
      {Number(userInfo?.role) == 1 ? <AdminProjects /> : <UserProjects />}
      <ProjectCreateModal checkRole={checkRole} email={userInfo?.email} />
    </>
  );
};

export default WrapperProjects;
