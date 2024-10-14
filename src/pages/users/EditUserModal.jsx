import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatarDefault from "../../assets/avatarUser.png";
import { REQUIRE_NAME, REQUIRE_PASSWORD } from "../../common/messageError";
import { updateUser } from "../../store/actions/userAction";
import './style.scss';
import { ToastCommon } from "../../components/ToastCommon";
import { TOAST } from "../../common/constants";

const initErrorMessages = {
    name: '',
    email: '',
    password: ''
}

function EditUserModal({ userEdit }) {

    const dispatch = useDispatch()
    const { listUser } = useSelector((state) => state.userStore)
    const [isSaving, setSaving] = useState(false)
    const [toggleUpdatePassword, setToggleUpdatePassword] = useState(false)
    const [userDetail, setUserDetail] = useState(userEdit)
    const [errorMessages, setErrorMessages] = useState(initErrorMessages)

    const handleOnSubmit = () => {
        if (userDetail.name.length === 0) {
            setErrorMessages({ name: REQUIRE_NAME })
            return
        }

        if (toggleUpdatePassword && userDetail.password.length === 0) {
            console.log(444);

            setErrorMessages({ password: REQUIRE_PASSWORD })
            return
        }

        dispatch(
            updateUser(
                userDetail,
                () => setSaving(true),
                () => setSaving(false)
            )
        )
    }

    const handleSetName = (value) => {
        setUserDetail({
            ...userDetail,
            name: value
        })
    }

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0]
        if (file) {
          if (!['image/jpg','image/png','image/jpeg'].includes(file.type)) {
              ToastCommon(TOAST.ERROR, 'File type invalid')
              return
          } else {
            setUserDetail({
                ...userDetail,
                avarta: file
            })
          }
        }
    }


    const handleSetPassword = (value) => {
        setUserDetail({
            ...userDetail,
            password: value
        })
    }

    const handleAttachFile = () => {
        document.getElementById('input-upload').click()
    }

    const handleRemoveFile = () => {
        const userByEmail = listUser.find((user) => userEdit.email === user.email )
        if (userByEmail.avarta && userByEmail.avarta.length > 0) {
            ToastCommon(TOAST.ERROR, 'Cannot set avatar as default after updating avatar')
            return
        }
        setUserDetail({
            ...userDetail,
            avarta: null
        })
    }

    const getAvatarUrl = () => {
        if (userDetail.avarta) {
            if (typeof userDetail.avarta === 'string') {
                return userDetail.avarta
            } else {
                return URL.createObjectURL(userDetail.avarta)
            }
        } else {
            return avatarDefault
        }
    }

    const handleTogglePassword = (checked) => {
        setToggleUpdatePassword(checked)
        if (errorMessages.password && errorMessages.password.length > 0) {
            setErrorMessages(initErrorMessages)
        }
        setUserDetail({
            ...userDetail,
            password: ''
        })
    }

    useEffect(() => {
        setToggleUpdatePassword(false)
        setUserDetail(userEdit)
        setErrorMessages(initErrorMessages)
    },[userEdit])

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
                            id="avatar-edit" 
                            src={getAvatarUrl()}
                            className="rounded-circle" 
                            alt="example placeholder" />
                            <input accept="image/*" type='file' onChange={(e) => handleChangeAvatar(e)} id="input-upload" className="d-none" />
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="rounded-circle btn btn-light" onClick={handleAttachFile}><i className="fa-solid fa-paperclip"></i></div>
                            &nbsp;
                            <div className="rounded-circle btn btn-light" onClick={handleRemoveFile}><i className="fa-solid fa-xmark"></i></div>
                        </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                disabled 
                                type="text" 
                                placeholder="Enter email"
                                className={`form-control ${errorMessages.email?.length > 0 && 'is-invalid'}`}
                                value={userDetail.email}
                            />
                            <span className="invalid-feedback">{errorMessages.email}</span>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input 
                                type="text" 
                                placeholder="Enter name"
                                className={`form-control ${errorMessages.name?.length > 0 && 'is-invalid'}`}
                                value={userDetail.name}
                                onChange={(e) => handleSetName(e.target.value)}
                            />
                            <span className="invalid-feedback">{errorMessages.name}</span>
                        </div>
                        <hr />
                        <div className="mb-3">
                            <div className="form-check form-switch">
                                <input 
                                    className="form-check-input cursor-pointer" 
                                    type="checkbox" 
                                    id="flexSwitchCheckDefault"
                                    checked={toggleUpdatePassword}
                                    onChange={(e) => handleTogglePassword(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Update New Password</label>
                            </div> 
                            
                        </div>
                        <div className="mb-3">
                            {
                                toggleUpdatePassword && <>
                                    <input 
                                        type="password" 
                                        className={`form-control ${errorMessages.password?.length > 0 && 'is-invalid'} `}
                                        placeholder="Enter new password"
                                        value={userDetail.password}
                                        onChange={(e) => handleSetPassword(e.target.value)}
                                    />
                                    <span className="invalid-feedback">{errorMessages.password}</span>
                                </>
                            }
                            
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