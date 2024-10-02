import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { downloadCSV } from "../../common/downloadCSV";
import usePagination from "../../hooks/usePagination";
import { changeRole, deleteUser } from "../../store/actions/userAction";
import { SET_CURRENT_PAGE } from "../../store/constants";

function ListUser({ setUserDetail }) {
  
  const [text, setText] = useState("");
  const [result, setResult] = useState([])
  const dispatch = useDispatch();

  const { currentPage, listUser } = useSelector((state) => state.userStore);

  const { totalPage, paginatedData } = usePagination(listUser, result);
console.log(paginatedData);

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

  const handleChangePage = (page) => {
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: page,
    });
  };

  const handleSearch = useCallback(
    debounce(
      (keyWord) => {
        setResult(listUser.filter((user) => 
          user.email.toLowerCase().includes(keyWord.toLowerCase()) ||
          user.name.toLowerCase().includes(keyWord.toLowerCase()))
        )
        dispatch({
          type: SET_CURRENT_PAGE,
          payload: 1,
        });
      },
      [1000]
    ), []
  );

  const handleExportCSV = () => {
    let data = []
    Object.values(paginatedData).forEach((items) => {
      items.forEach((item) => {
        data.push({
          ...item,
          role: item.role === 1 ? "Admin" : "User",
        })
      })
    })

    if (data.length > 0) {
      downloadCSV(data)
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between m-2">
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
            type="text"
            className="form-control me-2"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          /> &nbsp;
          <button title="Export data as CSV file" className="btn btn-success" onClick={handleExportCSV}>
            <i className="fa-solid fa-file-csv"></i>
          </button>
        </div>
      </div>
      <div className="col-md-12" style={{ minHeight: "330px" }}>
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
            {paginatedData["page" + currentPage] &&
              paginatedData["page" + currentPage].map((user) => (
                <tr key={user.id}>
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
