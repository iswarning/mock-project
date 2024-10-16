import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { convertDateToDMY } from '../../common/dateFormat';
import { deleteProject } from '../../store/actions/projectAction';
import ProjectCreateModal from './ProjectCreateModal';
import ProjectUpdateModal from './ProjectUpdateModal';

const ProjectsList = ({ projects }) => {
  console.log('🚀 ~ projects:', projects);
  const [projectData, setProjectData] = useState({
    name: '',
    payment: '',
    time_start: '',
    time_end: '',
    note: '',
    priority: '',
  });
  const { userInfo } = useSelector((state) => state.authStore);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (confirm('Are you sure delete this project?')) dispatch(deleteProject({ id }));
  };

  const showProjectUpdateModal = (project) => {
    setProjectData(project);
  };

  return (
    <>
      <div
        className="container mt-2 mb-4 d-flex justify-content-between align-items-center"
        id="project"
      >
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn bgCreate px-4 py-2 text-white"
            data-bs-toggle="modal"
            data-bs-target="#projectCreateModal"
            disabled={userInfo?.role != 1}
          >
            <strong>
              <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                Create Project
              </span>
              <span className="d-block d-sm-none d-md-none d-lg-none d-xl-none">
                <i className="fa-solid fa-plus"></i>
              </span>
            </strong>
          </button>
        </div>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            onChange={(e) => handleSetText(e.target.value)}
          />
        </div>
      </div>
      <div className="container my-4">
        <div className="row">
          {projects &&
            projects.map((project) => (
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-4" key={project.id}>
                <div
                  className={`card bg-light shadow-sm border border-3 ${
                    project.priority === 1
                      ? 'border-danger'
                      : project.priority === 2
                      ? 'border-warning'
                      : ''
                  }`}
                >
                  <div className="card-body">
                    <h5 className="card-title mb-3 border-bottom pt-1 pb-2 text-truncate">
                      <strong>{project.name}</strong>
                    </h5>
                    <p className="card-text text-truncate">
                      <strong>Note: </strong>
                      {project.note}
                    </p>
                    <p className="card-text text-truncate">
                      <strong>Payment: </strong>
                      {project.payment}
                    </p>
                    <p className="card-text text-truncate">
                      <strong>Time Start: </strong>
                      {convertDateToDMY(project.time_start)}
                    </p>
                    <p className="card-text text-truncate">
                      <strong>Time End: </strong>
                      {convertDateToDMY(project.time_end)}
                    </p>
                    <p className="card-text text-truncate">
                      <strong>Priority: </strong>
                      {project.priority}
                    </p>
                    <div className="mt-2 text-center">
                      <button
                        type="button"
                        className="btn btn-primary mx-1 my-1"
                        data-bs-toggle="modal"
                        data-bs-target="#projectUpdateModal"
                        onClick={() => showProjectUpdateModal(project)}
                        disabled={userInfo?.role != 1}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mx-1 my-1"
                        onClick={() => handleDelete(project.id)}
                        disabled={userInfo?.role != 1}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <ProjectCreateModal />
      <ProjectUpdateModal projectData={projectData} />
    </>
  );
};

export default ProjectsList;
