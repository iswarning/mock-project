import avatarDefault from "../../assets/avatarUser.png";

function TaskElementRoleUser({ task, user }) {
  const convertDateTime = (dt) => {
    const date = new Date(dt);

    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <div className="task">
      <div className="task__tags d-flex justify-content-between">
        <div>
          <span className={`task__tag task__tag--copyright`}>
            {task.project_name}
          </span>
        </div>
        <div className="dropdown">
          <button
            className="task__options"
            id={`dropdown-${task.id}`}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-ellipsis-h"></i>
          </button>
          <ul className="dropdown-menu" aria-labelledby={`dropdown-${task.id}`}>
            <li>
              <a className="dropdown-item" role="button">
                <i className="fa-solid fa-pen-to-square"></i> Edit
              </a>
            </li>
            <li>
              <a className="dropdown-item" role="button">
                <i className="fa-solid fa-trash"></i> Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p>{task.note}</p>
      <div className="task__stats mb-3">
        <div>
          <i className="fa-solid fa-hourglass-start"></i>{" "}
          <span className="ps-2">{convertDateTime(task.time_start)}</span>
        </div>
        <div>
          <i className="fa-solid fa-hourglass-end"></i>{" "}
          <span className="ps-2">{convertDateTime(task.time_end)}</span>
        </div>
      </div>
      <div>
        <img
          src={user.avarta || avatarDefault}
          width={25}
          height={25}
          className="rounded-circle"
        />
      </div>
    </div>
  );
}

export default TaskElementRoleUser;
