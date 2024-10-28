import { debounce } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ElementUser from "./ElementUser";
import PaginationUser from "./PaginationUser";
import { useDispatch } from "react-redux";
import { getListUser } from "../../store/actions/userAction";

function ListUser({ setUserEdit }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [role, setRole] = useState('default')

  const { listUser } = useSelector((state) => state.userStore);

  const itemsPerPage = 5;

  const filteredData = useMemo(() => {
    let result = listUser;
    if (searchTerm.length > 0) {
      result = result.filter((user) => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (role !== 'default') {
      result = result.filter((user) => user.role === Number(role));
    }
    return result;
  }, [searchTerm, role, listUser]);

  const totalPage = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  const handleChangePage = (page) => {
    setCurrentPage(page)
  }

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

  const handleEditUser = useCallback((user) => {
    setUserEdit({
      ...user,
      password: '',
      avarta: user.avarta || null
    })
  },[])

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
                <ElementUser key={user.id} user={user} handleEditUser={handleEditUser} />
              ))}
          </tbody>
        </table>
      </div>
      <PaginationUser totalPage={totalPage} currentPage={currentPage} handleChangePage={(p) => handleChangePage(p)} />
    </>
  );
}

export default ListUser;
