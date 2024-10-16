import avatarDefault from '../../assets/avatarUser.png';

const tagMapping = {
    1: 'copyright',
    2: 'design',
    3: 'illustration'
}

const TaskElementRoleAdmin = ({ task, user, status, handleEdit, handleDelete, }) => {

    const convertDateTime = (dt) => new Date(dt).toISOString().split('T')[0]

    return (
        <div className='task'>
            <div className='task__tags d-flex justify-content-between'>
                <div>
                <span className={`task__tag task__tag--${tagMapping[status]}`}>{task.project_name}</span>
                </div>
                <div className="dropdown">
                    <button className='task__options' id={`dropdown-${task.id}`} data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-ellipsis-h"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby={`dropdown-${task.id}`}>
                        <li>
                            <a 
                            data-bs-toggle="modal"
                            data-bs-target="#modalEditTask" 
                            className="dropdown-item" 
                            role="button" 
                            onClick={() => handleEdit(task)}>
                                <i className="fa-solid fa-pen-to-square"></i> Edit</a></li>
                        <li>
                            <a className="dropdown-item" role="button" onClick={() => handleDelete(task.id)}>
                                <i className="fa-solid fa-trash"></i> Delete
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <p>{task.note}</p>
            <div className='task__stats mb-3'>
                <div><i className="fa-solid fa-hourglass-start"></i> {convertDateTime(task.time_start)}</div>
                <div><i className="fa-solid fa-hourglass-end"></i> {convertDateTime(task.time_end)}</div>
            </div>
            <div>
                <img src={user.avarta || avatarDefault} width={25} height={25} className="rounded-circle" />
            </div>
        </div>
    );
}

export default TaskElementRoleAdmin