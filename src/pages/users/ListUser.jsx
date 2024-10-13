import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import imageAVT from "../../assets/avatarUser.png";
import { CHANGEROLE, DELETE } from "../../common/messageConfirm";
import { changeRole, deleteUser } from "../../store/actions/userAction";

function ListUser({ setUserEdit }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [role, setRole] = useState('default')

  const { listUser } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();

  const itemsPerPage = 5

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage

  const indexOfLastItem = currentPage * itemsPerPage

  const filteredData = () => {
    if (searchTerm.length > 0 ) {

      let result = listUser.filter((user) => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

      return filterByRole(result)

    } else {
      return filterByRole(listUser)
    }
  }

  const filterByRole = (data) => {
    switch(role) {
      case '1':
        return data.filter((user) => user.role === 1)
      case '0':
        return data.filter((user) => user.role === 0)
      default:
        return data
    }
  }

  const totalPage = Math.ceil(filteredData().length / itemsPerPage)

  const currentItems = filteredData().slice(indexOfFirstItem, indexOfLastItem)

  const handleChangePage = (page) => {
    setCurrentPage(page)
  };

  const handleSearch = useCallback(
    debounce(
      (keyWord) => {
        setSearchTerm(keyWord)
        setCurrentPage(1)
      },
      [1000]
    ),
    []
  );

  const handleFilterRole = (value) => {
    setRole(value)
    setCurrentPage(1)
  }

  const handleChangeRole = (email, role) => {
    if (confirm(CHANGEROLE)) {
        dispatch(
            changeRole({
                email,
                role,
            })
        );
    }
};

const handleEditUser = (user) => {
  setUserEdit({
    ...user,
    password: '',
    avarta: null
  })
};

const handleDeleteUser = (id) => {
    if (confirm(DELETE.user)) {
        dispatch(
            deleteUser({
                id,
            })
        );
    }
};



  return (
    <>
      <div className="d-flex justify-content-between m-2 ">
        
        <div> 
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#modalCreateUser"
            title="Create User"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        
        <div className="d-flex align-items-center">
          <input
            type="search"
            className="form-control me-2"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />{" "}
          &nbsp;
          <select 
            style={{ width: '40%'}} 
            className="form-control" 
            onChange={(e) => handleFilterRole(e.target.value)} 
            value={role}
          >
            <option value="default">All</option>
            <option value='1'>Admin</option>
            <option value='0'>User</option>
          </select>
        </div>

      </div>
      <div className="col-md-12 " style={{ minHeight: "330px" }}>
        <table
          className="table table-responsive"
          style={{ tableLayout: "fixed" }}
        >
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Avatar</th>
              <th style={{ width: "25%" }}>Name</th>
              <th style={{ width: "35%" }}>Email</th>
              <th style={{ width: "15%" }}>Role</th>
              <th style={{ width: "15%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((user) => (
                <tr key={user.id}>
                  <td>
                    <img className="avatar" src={user?.avarta || imageAVT} alt="User Avatar" />
                  </td>
                  <td>
                      <span className="my-truncate text-truncate">
                          {user.name}
                      </span>
                  </td>
                  <td>
                      <span className="my-truncate text-truncate">
                          {user.email}
                      </span>
                  </td>
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
                      <button
                          className="btn btn-primary"
                          onClick={() => handleEditUser(user)}
                          data-bs-toggle="modal"
                          data-bs-target="#modalEditUser"
                          title="Edit this user"
                      >
                          <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      &nbsp;
                      <button
                          disabled={user.role === 1}
                          className="btn btn-danger"
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete this user"
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
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <a
                  role="button"
                  className="page-link"
                  onClick={() => handleChangePage(currentPage - 1)}
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
                      onClick={() => handleChangePage(i + 1)}
                    >
                      {i + 1}
                    </span>
                  </li>
                ) : (
                  <li key={i} className="page-item">
                    <a
                      className="page-link"
                      role="button"
                      onClick={() => handleChangePage(i + 1)}
                    >
                      {i + 1}
                    </a>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage === totalPage ? "disabled" : ""
                }`}
              >
                <a
                  role="button"
                  className="page-link"
                  onClick={() => handleChangePage(currentPage + 1)}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default ListUser;
