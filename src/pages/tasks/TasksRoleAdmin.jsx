import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../store/actions/taskAction";
import EditTaskModal from "./EditTaskModal";
import TaskElementRoleAdmin from "./TaskElementRoleAdmin";

const statusMapping = {
  1: "pending",
  2: "inprogress",
  3: "completed",
};

function TasksRoleAdmin() {
  const { listTask } = useSelector((state) => state.taskStore);

  const { listUser } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const [taskDetail, setTaskDetail] = useState(null);

  const handleEdit = (task) => {
    setTaskDetail(task);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete")) {
      dispatch(deleteTask({ id }));
    }
  };

  const getTasks = (status) => listTask.filter((task) => task.status == status);

  return (
    <div className="app">
      <main className="project">
        <div className="project-tasks">
          {Object.keys(statusMapping).map((status) => (
            <div className="project-column" key={status}>
              <div className="project-column-heading">
                <h2 className="project-column-heading__title">
                  {statusMapping[status].toUpperCase()}
                </h2>
              </div>
              {getTasks(status).map((task) => {
                const user = listUser.find(
                  (user) => user.email === task.user_mail
                );

                if (!user) return;

                return (
                  <TaskElementRoleAdmin
                    key={task.id}
                    task={task}
                    user={user}
                    status={status}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </main>
      <EditTaskModal taskEdit={taskDetail} />
    </div>
  );
}

export default TasksRoleAdmin;
