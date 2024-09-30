import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePagination from '../../hooks/usePagination';
import { changeRole, deleteUser } from '../../store/actions/userAction';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';

export default function RoleAdmin() {
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  const [userDetail, setUserDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [text, setText] = useState('');

  const { listUser } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();

  const { totalPage, paginatedData } = usePagination(listUser, text);

  const handleChangeRole = (email, role) => {
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
    if (confirm('Are you sure you want to delete')) {
      dispatch(
        deleteUser({
          id,
        })
      );
    }
  };

  const handleSetText = (value) => {
    setText(value);
  };

  return (
    <>
      <div className="row">
        <div className="d-flex justify-content-between m-2">
          <div>
            <button
              className="btn btn-success"
              onClick={() => setOpenCreateUserModal(!openCreateUserModal)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={(e) => handleSetText(e.target.value)}
            />
          </div>
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
              {paginatedData['page' + currentPage] &&
                paginatedData['page' + currentPage].map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <select
                        className="form-control"
                        value={user.role}
                        onChange={(e) => handleChangeRole(user.email, e.target.value)}
                      >
                        <option value={0}>User</option>
                        <option value={1}>Admin</option>
                      </select>
                    </td>
                    <td>
                      <button className="btn btn-primary" onClick={() => handleEditUser(user)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      &nbsp;
                      <button
                        disabled={user.role === 1}
                        className="btn btn-danger"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {totalPage > 1 && (
          <div className="col-md-12">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <a
                    role="button"
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </a>
                </li>
                {Array.from({ length: totalPage }).map((p, i) =>
                  i + 1 === currentPage ? (
                    <li key={i} className="page-item active" aria-current="page">
                      <span
                        role="button"
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </span>
                    </li>
                  ) : (
                    <li key={i} className="page-item">
                      <a
                        className="page-link"
                        role="button"
                        href="javascript:void(0)"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </a>
                    </li>
                  )
                )}
                <li className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}>
                  <a
                    role="button"
                    className="page-link"
                    href="javascript:void(0)"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
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
