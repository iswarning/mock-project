import { useEffect, useState } from "react"
import { Modal, Spinner } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { updateUser } from "../../store/actions/userAction"

function EditUserModal({ userDetail, isShowModal, onRequestCloseModal }) {

    const dispatch = useDispatch()

    const [email, setEmail] = useState(userDetail.email)
    const [name, setName] = useState(userDetail.name)
    const [isSaving, setSaving] = useState(false)

    const handleOnSubmit = () => {
        dispatch(
            updateUser({
                email,
                name
            },
            onRequestCloseModal, 
            () => setSaving(true),
            () => setSaving(false))
        )
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

export default EditUserModal