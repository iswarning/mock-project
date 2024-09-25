import { useRef } from "react"
import { createUser } from "../../store/actions/userAction"
import { useDispatch } from "react-redux"
import { Button, Modal } from "react-bootstrap"

function CreateUserModal({ isShowModal, onRequestCloseModal }) {

    const email = useRef(null)
    const name = useRef(null)
    const password = useRef(null)
    const confirmPassword = useRef(null)
    const role = useRef(null)
 
    const dispatch = useDispatch()

    const handleOnSubmit = () => {
        dispatch(createUser({
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
            confirmPassword: password.current.value,
            role: role.current.value
        }))
        onRequestCloseModal()
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
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select className="form-select" ref={role}>
                        <option value="0">User</option>
                        <option value="1">Admin</option>
                    </select>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleOnSubmit}>
            Save Changes
        </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default CreateUserModal