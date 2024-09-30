/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { convertDateToDMY } from '../../common/dateFormat';

const UserProjects = () => {
  const { projectsByUser } = useSelector((state) => state.projectStore);
  const dispatch = useDispatch();

  return (
    <>
      <div className="container my-4">
        <div className="row">
          {projectsByUser &&
            projectsByUser.map((project) => (
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
                    <div className="mt-2">
                      <button
                        type="button"
                        className="btn btn-primary mx-1"
                        data-bs-toggle="modal"
                        data-bs-target="#projectUpdateModal"
                        disabled
                      >
                        Update
                      </button>
                      <button type="button" className="btn btn-danger mx-1" disabled>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default UserProjects;
