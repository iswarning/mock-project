import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statusMapping } from "../../common/constants";
import { deleteTask } from "../../store/actions/taskAction";
import EditTaskModal from "./EditTaskModal";
import TaskElementRoleAdmin from "./TaskElementRoleAdmin";

const initTask = {
  id: "",
  status: 1,
  task_name: "",
  note: "",
  time_start: "",
  time_end: "",
  user_name: "",
  user_mail: "",
  project_id: "",
  project_name: "",
  project_start: "",
  project_end: "",
};

function TasksRoleAdmin() {
  const { listTask } = useSelector((state) => state.taskStore);

  const dispatch = useDispatch();
  const [taskDetail, setTaskDetail] = useState(initTask);

  const handleEdit = (task) => {
    setTaskDetail(task);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete")) {
      dispatch(deleteTask({ id }));
    }
  };

  const filteredTasks = useMemo(() => {
    const tasksByStatus = {};
    Object.keys(statusMapping).forEach((status) => {
      tasksByStatus[status] = listTask.filter(
        (task) => task.status === parseInt(status)
      );
    });
    return tasksByStatus;
  }, [listTask]);

  return (
    <div className="app">
      <main className="project">
        <div className="project-tasks">
          {Object.keys(statusMapping).map((status) => (
            <div className="project-column " key={status}>
              <div className="project-column-heading">
                <h2 className="project-column-heading__title">
                  {statusMapping[status].toUpperCase()}{" "}
                  <span className="fs-6">
                    ({filteredTasks[status]?.length})
                  </span>
                </h2>
              </div>
              <div className="project-column-body">
                {filteredTasks[status].map((task) => (
                  <TaskElementRoleAdmin
                    key={task.id}
                    task={task}
                    status={status}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <EditTaskModal taskEdit={taskDetail} />
    </div>
  );
}

export default TasksRoleAdmin;
