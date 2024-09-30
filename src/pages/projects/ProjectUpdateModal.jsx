import { useEffect, useState } from 'react';
import { convertDateToYMD, convertDateWithCurrentTime } from '../../common/dateFormat';
import { useDispatch } from 'react-redux';
import { updateProject } from '../../store/actions/projectAction';

/* eslint-disable react/prop-types */
function ProjectUpdateModal({ projectData }) {
  const [project, setProject] = useState(projectData);
  const dispatch = useDispatch();

  useEffect(() => {
    setProject(projectData);
  }, [projectData]);

  const handleProjectNameChange = (e) => {
    setProject({ ...project, name: e.target.value });
  };

  const handleNoteChange = (e) => {
    setProject({ ...project, note: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setProject({ ...project, payment: e.target.value });
  };

  const handleTimeStartChange = (e) => {
    setProject({ ...project, time_start: convertDateWithCurrentTime(e.target.value) });
  };
  const handleTimeEndChange = (e) => {
    setProject({ ...project, time_end: convertDateWithCurrentTime(e.target.value) });
  };

  const handlePriorityChange = (e) => {
    setProject({ ...project, priority: Number(e.target.value) });
  };

  const handleUpdateProject = () => {
    if (project) {
      dispatch(updateProject(project));
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="projectUpdateModal"
        tabIndex="-1"
        aria-labelledby="projectUpdateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h1 className="modal-title fs-5" id="projectUpdateModalLabel">
                Project Information
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container mt-5">
                <form>
                  <div className="row mb-3">
                    <label htmlFor="name" className="col-4 col-form-label">
                      Project Name
                    </label>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Project Name..."
                        value={project?.name}
                        onChange={(e) => handleProjectNameChange(e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="note" className="col-4 col-form-label">
                      Email
                    </label>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="note"
                        placeholder="Note..."
                        value={project?.note}
                        onChange={(e) => handleNoteChange(e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="payment" className="col-4 col-form-label">
                      Payment
                    </label>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="payment"
                        placeholder="Payment"
                        value={project?.payment}
                        onChange={(e) => handlePaymentChange(e)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="timeStart" className="col-4 col-form-label">
                      Time Start
                    </label>
                    <div className="col-8">
                      <input
                        type="date"
                        className="form-control"
                        id="timeStart"
                        value={convertDateToYMD(project?.time_start)}
                        onChange={(e) => handleTimeStartChange(e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="timeEnd" className="col-4 col-form-label">
                      Time End
                    </label>
                    <div className="col-8">
                      <input
                        type="date"
                        className="form-control"
                        id="timeEnd"
                        value={convertDateToYMD(project?.time_end)}
                        onChange={(e) => handleTimeEndChange(e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="priority" className="col-4 col-form-label">
                      Priority
                    </label>
                    <div className="col-8">
                      <select
                        className="form-select"
                        aria-label="priority"
                        value={project?.priority}
                        onChange={(e) => handlePriorityChange(e)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => handleUpdateProject()}
              >
                Update
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectUpdateModal;
