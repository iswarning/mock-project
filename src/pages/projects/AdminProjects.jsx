/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertDateToDMY } from "../../common/dateFormat";
import { deleteProject } from "../../store/actions/projectAction";
import ProjectUpdateModal from "./ProjectUpdateModal";

const AdminProjects = () => {
  const { projects } = useSelector((state) => state.projectStore);
  const [project, setProject] = useState("");
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (confirm("Are you sure delete this project?"))
      dispatch(deleteProject({ id }));
  };

  const showProjectUpdateModal = (project) => {
    if (project) {
      setProject(project);
    }
  };

  return (
    <>
      <div className="container my-4">
        <div className="row">
          {projects &&
            projects.map((project) => (
              <div
                className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4"
                key={project.id}
              >
                <div className="card bg-light">
                  <div className="card-body">
                    <h5 className="card-title mb-3 border-bottom pt-1 pb-2">
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
                        className="btn btn-primary mx-1"
                        data-bs-toggle="modal"
                        data-bs-target="#projectUpdateModal"
                        onClick={() => showProjectUpdateModal(project)}
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
      <ProjectUpdateModal projectData={project} />
    </>
  );
};

export default AdminProjects;
