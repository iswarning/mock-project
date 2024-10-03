import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertDateToDMY } from "../../common/dateFormat";
import projectsPagination from "../../hooks/projectsPagination";
import { deleteProject } from "../../store/actions/projectAction";
import { SET_CURRENT_PAGE } from "../../store/constants";
import ProjectCreateModal from "./ProjectCreateModal";
import ProjectUpdateModal from "./ProjectUpdateModal";

const ProjectsList = ({ projects }) => {
  const [projectData, setProjectData] = useState({
    name: "",
    payment: "",
    time_start: "",
    time_end: "",
    note: "",
    priority: "",
  });
  const [text, setText] = useState("");
  const { currentPage } = useSelector((state) => state.projectStore);
  const { userInfo } = useSelector((state) => state.authStore);
  const dispatch = useDispatch();
  const { totalPage, paginatedData } = projectsPagination(projects, text);

  const handleDelete = (id) => {
    if (confirm("Are you sure delete this project?"))
      dispatch(deleteProject({ id }));
  };

  const showProjectUpdateModal = (project) => {
    setProjectData(project);
  };

  const handleChangePage = (page) => {
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: page,
    });
  };

  const handleSetText = useCallback(
    debounce(
      (value) => {
        setText(value);
        dispatch({
          type: SET_CURRENT_PAGE,
          payload: 1,
        });
      },
      [1000]
    )
  );

  return (
    <>
      <div
        className="container mt-2 mb-4 d-flex justify-content-between align-items-center"
        id="project"
      >
        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn bgCreate px-5 py-2 text-white"
            data-bs-toggle="modal"
            data-bs-target="#projectCreateModal"
            disabled={userInfo?.role != 1}
          >
            <strong>Create Project</strong>
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
          {paginatedData["page" + currentPage] &&
            paginatedData["page" + currentPage].map((project) => (
              <div
                className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4"
                key={project.id}
              >
                <div className="card bg-light">
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
                    <div className="mt-2">
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
      {totalPage > 1 && (
        <div className="col-md-12">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <a
                  role="button"
                  className="page-link"
                  onClick={() => handleChangePage(currentPage - 1)}
                >
                  Previous
                </a>
              </li>
              {Array.from({ length: totalPage }).map((p, i) =>
                i + 1 === currentPage ? (
                  <li key={i} className="page-item active" aria-current="page">
                    <span
                      role="button"
                      className="page-link"
                      onClick={() => handleChangePage(i + 1)}
                    >
                      {i + 1}
                    </span>
                  </li>
                ) : (
                  <li key={i} className="page-item">
                    <a
                      className="page-link"
                      role="button"
                      onClick={() => handleChangePage(i + 1)}
                    >
                      {i + 1}
                    </a>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage === totalPage ? "disabled" : ""
                }`}
              >
                <a
                  role="button"
                  className="page-link"
                  onClick={() => handleChangePage(currentPage + 1)}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
      <ProjectCreateModal />
      <ProjectUpdateModal projectData={projectData} />
    </>
  );
};

export default ProjectsList;
