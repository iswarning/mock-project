/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatISODateToDDMMYYYY } from '../../common/dateFormat';
import { getAdminProjectsData } from '../../store/actions/projectAction';
import ProjectUpdateModal from './ProjectUpdateModal';

const AdminProjects = () => {
  const { adminProjects } = useSelector((state) => state.projectStore);
  console.log('🚀 ~ adminProjects:', adminProjects);
  const dispatch = useDispatch();
  const [projectData, setProjectData] = useState('');

  const handleDelete = (id) => {
    console.log('DELETE', id);
    // dispatch(deleteProject(id));
  };

  const toggleProjectModal = (project) => {
    if (project) {
      setProjectData(project);
    }
  };

  useEffect(() => {
    dispatch(getAdminProjectsData());
  }, []);

  return (
    <>
      <div className="container my-4">
        <div className="row">
          {adminProjects &&
            adminProjects.map((project) => (
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4" key={project.id}>
                <div className="card bg-light">
                  <div className="card-body">
                    <h5 className="card-title mb-3 border-bottom pt-1 pb-2">Project</h5>
                    <p className="card-text text-truncate">
                      <strong>Project Name: </strong>
                      {project.name}
                    </p>
                    <p className="card-text text-truncate">
                      <strong>Note: </strong>
                      {project.note ? project.note : 'No notes yet!'}
                    </p>
                    <p className="card-text text-truncate">
                      <strong>Payment: </strong>
                      {project.payment}
                    </p>
                    <p className="card-text text-truncate">
                      <strong>Time Start: </strong>
                      {formatISODateToDDMMYYYY(project.time_start)}
                    </p>
                    <p className="card-text text-truncate">
                      <strong>Time End: </strong>
                      {formatISODateToDDMMYYYY(project.time_end)}
                    </p>
                    <p className="card-text text-truncate">
                      <strong>Priority: </strong>
                      {project.priority}
                    </p>
                    <div className="mt-2">
                      <button
                        type="button"
                        className="btn btn-primary mx-1"
                        data-bs-toggle="modal"
                        data-bs-target="#projectUpdateModal"
                        onClick={() => toggleProjectModal(project)}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mx-1"
                        onClick={() => handleDelete(project.id)}
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
      <ProjectUpdateModal projectData={projectData} />
    </>
  );
};

export default AdminProjects;
