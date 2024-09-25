/* eslint-disable no-unused-vars */
import React from 'react';
import AdminProjects from './AdminProjects';
import UserProjects from './UserProjects';
import ProjectCreateModal from './ProjectCreateModal';

const WrapperProjects = () => {
  const role = 1;
  return (
    <>
      <div className="container mt-2 mb-4">
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-warning px-5 py-2 text-white"
            data-bs-toggle="modal"
            data-bs-target="#projectCreateModal"
          >
            <strong>Create Project</strong>
          </button>
        </div>
      </div>
      {role == 1 ? <AdminProjects /> : <UserProjects />}
      <ProjectCreateModal />
    </>
  );
};

export default WrapperProjects;
