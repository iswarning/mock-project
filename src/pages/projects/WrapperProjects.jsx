/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { getProjectsData } from '../../store/actions/projectAction';
import AdminProjects from './AdminProjects';
import ProjectCreateModal from './ProjectCreateModal';
import UserProjects from './UserProjects';

const WrapperProjects = () => {
  const { userInfo } = useSelector((state) => state.authStore);
  const { isLoading } = useSelector((state) => state.appStore);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectsData());
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="container mt-2 mb-4" id="project">
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn bgPrimary px-5 py-2 text-white"
            data-bs-toggle="modal"
            data-bs-target="#projectCreateModal"
            disabled={userInfo?.role !== 1}
          >
            <strong>Create Project</strong>
          </button>
        </div>
      </div>
      {Number(userInfo?.role) == 1 ? <AdminProjects /> : <UserProjects />}
      <ProjectCreateModal />
    </>
  );
};

export default WrapperProjects;
