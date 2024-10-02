/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { convertDateWithCurrentTime } from '../../common/dateFormat';
import { createProject } from '../../store/actions/projectAction';

function ProjectCreateModal({ checkRole, email }) {
  const dispatch = useDispatch();
  const projectName_Ref = useRef();
  const note_Ref = useRef();
  const payment_Ref = useRef();
  const timeStart_Ref = useRef();
  const timeEnd_Ref = useRef();
  const priority_Ref = useRef();

  const handleCreateProject = () => {
    const project = {
      name: projectName_Ref.current.value,
      payment: payment_Ref.current.value,
      time_start: convertDateWithCurrentTime(timeStart_Ref.current.value),
      time_end: convertDateWithCurrentTime(timeEnd_Ref.current.value),
      note: note_Ref.current.value,
      priority: Number(priority_Ref.current.value),
    };
    dispatch(createProject(project));
  };
  return (
    <>
      <div
        className="modal fade"
        id="projectCreateModal"
        tabIndex="-1"
        aria-labelledby="projectCreateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bgTittleModel">
              <h1 className="modal-title fs-5" id="projectCreateModalLabel">
                Create Project
              </h1>
            </div>
            <div className="modal-body">
              <div className="container mt-2">
                <form>
                  <div className="row mb-3">
                    <label htmlFor="name" className="col-4 col-form-label">
                      Name:
                    </label>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Project Name"
                        ref={projectName_Ref}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="note" className="col-4 col-form-label">
                      Note:
                    </label>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="note"
                        placeholder="Note..."
                        ref={note_Ref}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="payment" className="col-4 col-form-label">
                      Payment:
                    </label>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="payment"
                        placeholder="Payment"
                        ref={payment_Ref}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="timeStart" className="col-4 col-form-label">
                      Time Start:
                    </label>
                    <div className="col-8">
                      <input
                        type="date"
                        className="form-control"
                        id="timeStart"
                        ref={timeStart_Ref}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="timeEnd" className="col-4 col-form-label">
                      Time End:
                    </label>
                    <div className="col-8">
                      <input type="date" className="form-control" id="timeEnd" ref={timeEnd_Ref} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="priority" className="col-4 col-form-label">
                      Priority:
                    </label>
                    <div className="col-8">
                      <select className="form-select" aria-label="Priority" ref={priority_Ref}>
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
                className="btn bgPrimary"
                data-bs-dismiss="modal"
                onClick={() => handleCreateProject()}
              >
                Create
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

export default ProjectCreateModal;
