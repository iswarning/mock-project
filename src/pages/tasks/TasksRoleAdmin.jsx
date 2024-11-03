import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statusMapping } from "../../common/constants";
import { deleteTask } from "../../store/actions/taskAction";
import TaskElementRoleAdmin from "./TaskElementRoleAdmin";

function TasksRoleAdmin() {
  const { listTask } = useSelector((state) => state.taskStore);

  const dispatch = useDispatch();

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
              {
                filteredTasks[status]?.length > 0 && filteredTasks[status].map((task) => (
                  <TaskElementRoleAdmin
                    key={task.id}
                    task={task}
                    status={status}
                    handleDelete={handleDelete}
                  />
                ))
              }
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default TasksRoleAdmin;
