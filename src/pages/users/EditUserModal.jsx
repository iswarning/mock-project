import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../store/actions/userAction"

function EditUserModal({ userDetail }) {

    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.authStore)

    const [email, setEmail] = useState(userDetail.email)
    const [name, setName] = useState(userDetail.name)
 
    const [isSaving, setSaving] = useState(false)

    const handleOnSubmit = () => {
        dispatch(
            updateUser({
                email,
                name
            },
            userInfo,
            () => setSaving(true),
            () => setSaving(false))
        )
    }

    useEffect(() => {
        setEmail(userDetail.email)
        setName(userDetail.name)
    },[userDetail])

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
                            <input 
                                disabled 
                                type="text" 
                                className="form-control" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
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