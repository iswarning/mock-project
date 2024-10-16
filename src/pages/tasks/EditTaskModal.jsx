import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { REQUIRE_NOTE, REQUIRE_TIME_END, TIME_START_LESS_TIME_END } from "../../common/messageError";
import { updateTask } from "../../store/actions/taskAction";
import './style.scss';

const initErrorMessages = {
    time_end: '',
    note: ''
}

function EditTaskModal({ taskEdit }) {

    const dispatch = useDispatch()
    const [taskDetail, setTaskDetail] = useState(taskEdit)
    const [errorMessages, setErrorMessages] = useState(initErrorMessages)

    const handleOnSubmit = () => {
        if (taskDetail.note.length === 0) {
            setErrorMessages({ note: REQUIRE_NOTE })
            return
        }

        if (taskDetail.time_end.length === 0) {
            setErrorMessages({ time_end: REQUIRE_TIME_END })
            return
        }

        if (Date.parse(taskDetail.time_start) > Date.parse(taskDetail.time_end)){
            setErrorMessages({ time_end: TIME_START_LESS_TIME_END })
            return
        }

        dispatch(
            updateTask(
                taskDetail
            )
        )
    }

    const handleSetTimeEnd = (value) => {
        setTaskDetail({
            ...taskDetail,
            time_end: value
        })
    }

    const handleSetNote = (value) => {
        setTaskDetail({
            ...taskDetail,
            note: value
        })
    }

    const convertDateTime = (value) => {
        if (!value) {
            return ''
        }
        return new Date(value).toISOString().split('T')[0]
    }

    useEffect(() => {
        setTaskDetail(taskEdit)
        setErrorMessages(initErrorMessages)
    },[taskEdit])

    return (
        <div className="modal fade" id="modalEditTask">
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Edit Task</h4>
                    <button id='close-edit-task-btn' type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Note</label>
                            <textarea 
                            rows={3} 
                            className={`form-control ${errorMessages.note?.length > 0 && 'is-invalid'}`} 
                            value={taskDetail?.note}
                            onChange={(e) => handleSetNote(e.target.value)}></textarea>
                            <span className="invalid-feedback">{errorMessages.note}</span>

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Time Start</label>
                            <input 
                                disabled 
                                type="date" 
                                className='form-control'
                                value={convertDateTime(taskDetail?.time_start)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Time End</label>
                            <input 
                                type="date" 
                                className={`form-control ${errorMessages.time_end?.length > 0 && 'is-invalid'}`}
                                value={convertDateTime(taskDetail?.time_end)}
                                onChange={(e) => handleSetTimeEnd(e.target.value)}
                            />
                            <span className="invalid-feedback">{errorMessages.time_end}</span>
                        </div>
                    </form>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-primary"  onClick={handleOnSubmit}>
                        Save Changes
                    </button>
                </div>

                </div>
            </div>
        </div>
    )
}

export default EditTaskModal