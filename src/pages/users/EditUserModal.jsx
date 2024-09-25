import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { updateUser } from "../../store/actions/userAction"

function EditUserModal({ userDetail, isShowModal, onRequestCloseModal }) {

    const dispatch = useDispatch()

    const [email, setEmail] = useState(userDetail.email)
    const [name, setName] = useState(userDetail.name)

    const handleOnSubmit = () => {
        dispatch(updateUser({
            email,
            name
        }))
        onRequestCloseModal()
    }

    useEffect(() => {
        setEmail(userDetail.email)
        setName(userDetail.name)
    },[userDetail])

    return (
        <Modal show={isShowModal} onHide={() => onRequestCloseModal()}>
            <Modal.Header>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
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

export default EditUserModal