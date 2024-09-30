import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/actions/userAction';

function CreateUserModal({ isShowModal, onRequestCloseModal }) {
  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const [isSaving, setSaving] = useState(false);

  const dispatch = useDispatch();

    const handleOnSubmit = () => {
        dispatch(
            createUser({
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
                confirmPassword: confirmPassword.current.value,
                role: 0
            },
            () => setSaving(true),
            () => setSaving(false))
        )
    }

  return (
    <div className="modal fade" id="modalCreateUser">
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Create User</h4>
                    <button id='close-create-user-btn' type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" ref={email}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" ref={name}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" ref={password} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" ref={confirmPassword} />
                        </div>
                    </form>
                </div>

                <div className="modal-footer">
                    {
                        isSaving ? <button className="btn btn-primary" disabled>
                            <span className="saving"></span> Saving...
                        </button> : <button className="btn btn-primary" onClick={handleOnSubmit}>
                            Save Changes
                        </button>
                    }
                </div>

                </div>
            </div>
        </div>
  )
}

export default CreateUserModal;
