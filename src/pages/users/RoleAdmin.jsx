import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRole, deleteUser } from "../../store/actions/userAction";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import { Button } from "react-bootstrap";

export default function RoleAdmin() {
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  const [userDetail, setUserDetail] = useState(null);

  const { listUser } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();

  const handleChangeRole = async (email, role) => {
    dispatch(
      changeRole({
        email,
        role,
      })
    );
  };

  const handleEditUser = (user) => {
    setUserDetail(user);
    setOpenEditUserModal(!openEditUserModal);
  };

  const handleDeleteUser = (id) => {
    if (confirm("Are you sure you want to delete")) {
      dispatch(
        deleteUser({
          id,
        })
      );
    }
  };

  return (
    <>
      <div className="row">
        <div>
          <Button
            variant="success"
            onClick={() => setOpenCreateUserModal(!openCreateUserModal)}
          >
            Create User
          </Button>
        </div>
        <div className="col-md-12">
          <table className="table table-responsive">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listUser?.length > 0 &&
                listUser.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <select
                        className="form-control"
                        value={user.role}
                        onChange={(e) =>
                          handleChangeRole(user.email, e.target.value)
                        }
                      >
                        <option value={0}>User</option>
                        <option value={1}>Admin</option>
                      </select>
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </Button>
                      &nbsp;
                      <button
                        disabled={user.role === 1}
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        
      </div>
      {userDetail && (
        <EditUserModal
          userDetail={userDetail}
          isShowModal={openEditUserModal}
          onRequestCloseModal={() => setOpenEditUserModal(!openEditUserModal)}
        />
      )}
      <CreateUserModal
        isShowModal={openCreateUserModal}
        onRequestCloseModal={() => setOpenCreateUserModal(!openCreateUserModal)}
      />
    </>
  );
}
