import { useRef, useState } from "react"
import { createUser } from "../../store/actions/userAction"
import { useDispatch } from "react-redux"
import { Button, Modal, Spinner } from "react-bootstrap"

function CreateUserModal({ isShowModal, onRequestCloseModal }) {

    const email = useRef(null)
    const name = useRef(null)
    const password = useRef(null)
    const confirmPassword = useRef(null)
    const [isSaving, setSaving] = useState(false)
 
    const dispatch = useDispatch()

    const handleOnSubmit = () => {
        dispatch(
            createUser({
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
                confirmPassword: confirmPassword.current.value,
                role: 0
            },
            onRequestCloseModal, 
            () => setSaving(true),
            () => setSaving(false))
        )
    }

  return (
    <Modal show={isShowModal} onHide={() => onRequestCloseModal()}>
        <Modal.Header>
            <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
            {
                isSaving ? <button className="btn btn-primary" disabled>
                    <Spinner animation="border" size="sm" /> Saving...
                </button> : <button className="btn btn-primary" onClick={handleOnSubmit}>
                    Save Changes
                </button>
            }
        </Modal.Footer>
    </Modal>
  )
}

export default CreateUserModal