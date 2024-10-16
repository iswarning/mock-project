import avatarDefault from '../../assets/avatarUser.png';

const tagMapping = {
    1: 'copyright',
    2: 'design',
    3: 'illustration'
}
function TaskElementRoleUser({ task, user, status }) {

    const convertDateTime = (dt) => {
        const date = new Date(dt);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }

  return (
    <div className='task'>
        <div className='task__tags d-flex justify-content-between'>
            <div>
            <span className={`task__tag task__tag--${tagMapping[status]}`}>{task.project_name}</span>
            </div>
        </div>
        <p>{task.note}</p>
        <p>{task.task_name}</p>
        <div className='task__stats mb-3'>
            <div><i className="fa-solid fa-hourglass-start"></i> {convertDateTime(task.time_start)}</div>
            <div><i className="fa-solid fa-hourglass-end"></i> {convertDateTime(task.time_end)}</div>
        </div>
        <div>
            <img src={user.avarta || avatarDefault} width={25} height={25} className="rounded-circle" />
        </div>
    </div>
  )
}

export default TaskElementRoleUser