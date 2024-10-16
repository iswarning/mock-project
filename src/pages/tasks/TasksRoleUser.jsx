import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../store/actions/taskAction";
import TaskElementRoleUser from './TaskElementRoleUser';

const statusMapping = {
  1: 'pending',
  2: 'inprogress',
  3: 'completed'
};

function TasksRoleUser() {
  const { listTask } = useSelector((state) => state.taskStore);
  const { listUser } = useSelector((state) => state.userStore);
  const { userInfo } = useSelector((state) => state.authStore);

  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Check if the task was dropped in the same place
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const taskId = result.draggableId;
    const task = listTask.find(task => task.id === taskId);

    if (task) {
      const newStatus = Number(destination.droppableId); // Get the new status from droppableId
      if (task.status !== newStatus && confirm(`Do you want to change the status of this task to ${statusMapping[newStatus].toUpperCase()}?`)) {
        dispatch(changeStatus({ ...task, status: newStatus }))
      }
    }
  };

  const getTasks = (status) => listTask
  .filter((task) => task.user_mail === userInfo.email)
  .filter((task) => task.status == status)

  return (
    <div className='app'>
      <DragDropContext onDragEnd={onDragEnd}>
        <main className='project'>
          <div className='project-tasks'>
            {Object.keys(statusMapping).map((status) => (
              <Droppable key={status} droppableId={String(status)}>
                {(provided) => (
                  <div className='project-column' ref={provided.innerRef} {...provided.droppableProps}>
                    <div className='project-column-heading'>
                      <h2 className='project-column-heading__title'>{statusMapping[status].toUpperCase()}</h2>
                    </div>
                    { getTasks(status).map((task, index) => {
                        const user = listUser.find((user) => user.email === task.user_mail);
                        if (!user) return              
                        return (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <TaskElementRoleUser task={task} user={user} />
                              </div>
                            )}
                          </Draggable>
                        );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </main>
      </DragDropContext>
    </div>
  );
}

export default TasksRoleUser;
