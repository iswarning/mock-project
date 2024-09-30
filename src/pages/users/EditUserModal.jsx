import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { updateUser } from "../../store/actions/userAction"

function EditUserModal({ userDetail }) {

    const dispatch = useDispatch()

    const email = useRef(null)
    const name = useRef(null)
 
    const [isSaving, setSaving] = useState(false)

    const handleOnSubmit = () => {
        dispatch(
            updateUser({
                email: email.current.value,
                name: name.current.value
            },
            () => setSaving(true),
            () => setSaving(false))
        )
    }

    return (
        <div className="modal fade" id="modalEditUser">
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Edit User</h4>
                    <button id='close-edit-user-btn' type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input disabled type="text" className="form-control" defaultValue={userDetail ? userDetail.email : ''} ref={email}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" defaultValue={userDetail ? userDetail.name : ''} ref={name}/>
                        </div>
                    </form>
                </div>

                <div className="modal-footer">
                    {
                        isSaving ? <button className="btn btn-primary" disabled>
                            <span className="saving"></span> Saving...
                        </button> : <button className="btn btn-primary"  onClick={handleOnSubmit}>
                            Save Changes
                        </button>
                    }
                </div>

                </div>
            </div>
        </div>
    )
}

export default EditUserModal