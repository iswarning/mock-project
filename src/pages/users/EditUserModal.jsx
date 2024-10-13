import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatarDefault from "../../assets/avatarUser.png";
import { REQUIRE_NAME } from "../../common/messageError";
import { updateUser } from "../../store/actions/userAction";
import './style.scss';

function EditUserModal({ userEdit, setUserEdit }) {

    const dispatch = useDispatch()
    const { userDetail } = useSelector((state) => state.userStore)
 
    const [isSaving, setSaving] = useState(false)
    const [errorMessages, setErrorMessages] = useState({
        name: ''
    })

    const handleOnSubmit = () => {
        if (userEdit.name.length === 0) {
            setErrorMessages({ name: REQUIRE_NAME })
            return
        }

        dispatch(
            updateUser(
                userEdit,
                () => setSaving(true),
                () => setSaving(false)
            )
        )
    }

    const handleSetName = (value) => {
        setUserEdit({
            ...userEdit,
            name: value
        })
    }

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0]
        if (file) {
          if (!['image/jpg','image/png','image/jpeg'].includes(file.type)) {
              ToastCommon(TOAST.ERROR, 'File type invalid')
              return
          }
        }
        setUserEdit({
            ...userEdit,
            avarta: file
        })
    }


    const handleSetPassword = (value) => {
        setUserEdit({
            ...userEdit,
            password: value
        })
    }

    const handleAttachFile = () => {
        document.getElementById('input-upload').click()
    }

    const handleRemoveFile = () => {
        setUserEdit({
            ...userEdit,
            avarta: null
        })
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
                        <div className="d-flex justify-content-center mb-3">
                            <img 
                            id="selectedAvatar" 
                            src={ userEdit.avarta ? URL.createObjectURL(userEdit.avarta) : avatarDefault }
                            className="rounded-circle" 
                            alt="example placeholder" />
                            <input accept="image/*" type='file' onChange={(e) => handleChangeAvatar(e)} id="input-upload" className="d-none" />
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="btn-rounded btn btn-light" onClick={handleAttachFile}><i className="fa-solid fa-paperclip"></i></div>
                            &nbsp;
                            <div className="btn-rounded btn btn-light" onClick={handleRemoveFile}><i className="fa-solid fa-xmark"></i></div>
                        </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                disabled 
                                type="text" 
                                className="form-control" 
                                value={userEdit.email}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input 
                                type="text" 
                                className={`form-control ${errorMessages.name?.length > 0 && 'is-invalid'}`}
                                value={userEdit.name}
                                onChange={(e) => handleSetName(e.target.value)}
                            />
                            <span className="invalid-feedback">{errorMessages.name}</span>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input 
                                type="password" 
                                className='form-control'
                                value={userEdit.password}
                                onChange={(e) => handleSetPassword(e.target.value)}
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