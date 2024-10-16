import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { createTask } from "../../store/actions/taskAction";
import Select from "react-select";

function AddTaskModal({ taskNewData }) {
  const { listUser } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const userEmails = listUser?.map((user) => user.email) || [];
  const { project_name, ...taskData } = taskNewData;

  const [formData, setFormData] = useState({ ...taskData });

  const [dateError, setDateError] = useState(false);

  // Cập nhật formData mỗi khi taskNewData thay đổi
  useEffect(() => {
    setFormData({ ...taskData });
  }, [taskNewData]);

  // Xử lý khi input thay đổi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const userOptions =
    listUser?.map((user) => ({
      value: user.email,
      label: user.email,
    })) || [];

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      user_mail: selectedOption ? selectedOption.value : "",
    });
  };

  const handleCreateTask = () => {
    if (new Date(formData.time_start) >= new Date(formData.time_end)) {
      setDateError(true); // Hiển thị lỗi
    } else {
      setDateError(false);
      dispatch(createTask(formData));

      // Đặt lại form về giá trị ban đầu
      setFormData({
        user_mail: "",
        project_id: taskNewData?.project_id || "",
        time_start: "",
        time_end: "",
        status: "",
        task_name: "",
        note: "",
      });

      // Đóng modal nếu không có lỗi
      const modalElement = document.getElementById("addTaskModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide(); // Đóng modal
      }
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="addTaskModal"
        tabIndex="-1"
        aria-labelledby="addTaskModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bgTittleModelCreateTask">
              <h1 className="modal-title fs-5" id="addTaskModalLabel">
                Create New Task of Project{" "}
                <span className="fs-4">{project_name}</span>
              </h1>
            </div>
            <div className="modal-body">
              <div className="container mt-2">
                <form>
                  <div className="row mb-3">
                    <label className="col-4 col-form-label">Project id:</label>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        name="project_id"
                        value={formData.project_id}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4 col-form-label">Task name:</label>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Task name"
                        name="task_name"
                        value={formData.task_name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4 col-form-label">User mail:</label>
                    <div className="col-8">
                      <Select
                        options={userOptions}
                        value={userOptions.find(
                          (option) => option.value === formData.user_mail
                        )}
                        className="selectEmail"
                        onChange={handleSelectChange}
                        placeholder="Search for user email..."
                        isClearable
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4 col-form-label">Time Start:</label>
                    <div className="col-8">
                      <input
                        type="date"
                        className="form-control"
                        name="time_start"
                        value={formData.time_start}
                        onChange={handleInputChange}
                        style={{ borderColor: dateError ? "red" : "" }}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4 col-form-label">Time End:</label>
                    <div className="col-8">
                      <input
                        type="date"
                        className="form-control"
                        name="time_end"
                        value={formData.time_end}
                        onChange={handleInputChange}
                        style={{ borderColor: dateError ? "red" : "" }}
                      />
                    </div>
                  </div>
                  {dateError && (
                    <div className="row mb-3">
                      <div className="col-12 text-end">
                        <span style={{ color: "red" }}>
                          Time Start must be before Time End.
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="row mb-3">
                    <label className="col-4 col-form-label">Status:</label>
                    <div className="col-8">
                      <select
                        className="form-select select-custom"
                        aria-label="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option hidden>Select status...</option>
                        <option value="1">Pending</option>
                        <option value="2">In-progress</option>
                        <option value="3">Complete</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4 col-form-label">Note:</label>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        name="note"
                        value={formData.note}
                        placeholder="Note..."
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn bgPrimary"
                onClick={handleCreateTask}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTaskModal;
