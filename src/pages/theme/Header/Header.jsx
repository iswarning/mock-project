import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import imageAVT from "../../../assets/avatarUser.png";
import { ROUTES } from "../../../common/constants";
import { logout } from "../../../store/actions/authAction";
import "./style.scss";

function Header({ openSidebar, closeSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userInfoLogin, setUserInfoLogin] = useState(
    localStorage.getItem("userName")
  );
  const dropdownRef = useRef(null); // Tạo ref cho dropdown

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  // Đóng dropdown nếu nhấp chuột bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Đóng dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Lắng nghe sự kiện nhấp chuột
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Dọn dẹp sự kiện khi unmount
    };
  }, [dropdownRef]); // Thêm dropdownRef vào dependencies

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.login);
    setIsOpen(false);
  };

  // Hàm để lắng nghe thay đổi của localStorage trong cùng tab
  const syncLocalStorage = () => {
    setUserInfoLogin(localStorage.getItem("userName"));
  };

  // Lắng nghe sự kiện từ các tab khác (storage event)
  useEffect(() => {
    window.addEventListener("storage", syncLocalStorage);

    // Cleanup khi component unmount
    return () => {
      window.removeEventListener("storage", syncLocalStorage);
    };
  }, []);

  // Cập nhật state khi `localStorage.setItem` thay đổi trong cùng tab
  useEffect(() => {
    const originalSetItem = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments); // Gọi hàm gốc
      const event = new Event("localStorageChange"); // Tạo sự kiện tùy chỉnh
      window.dispatchEvent(event); // Phát ra sự kiện
    };

    window.addEventListener("localStorageChange", syncLocalStorage); // Lắng nghe sự kiện tùy chỉnh

    return () => {
      window.removeEventListener("localStorageChange", syncLocalStorage);
      localStorage.setItem = originalSetItem; // Khôi phục hàm gốc khi unmount
    };
  }, []);

  return (
    <div className="bg-white shadow container-fluid">
      <div id="header">
        <div className="row w-100">
          <div className="col-8 d-flex ">
            <div className="header-left">
              <button className="sidebar-button" onClick={openSidebar}>
                <i className="fa-solid fa-bars"></i>
              </button>
              <h2 className="align-items-center">Welcome to Our Page</h2>
            </div>
          </div>
          <div className="col-4 text-end">
            <div className="dropdownHeader" ref={dropdownRef}>
              <button
                type="button"
                className="dropdownHeader-toggle"
                onClick={() => toggleDropdown()}
              >
                <span className="smallScreenSpan">{userInfoLogin}</span>
                <img src={imageAVT} alt="User Avatar" />
              </button>
              {isOpen && (
                <ul className="dropdownHeader-menu">
                  <li>List Info</li>
                  <li onClick={() => handleLogout()}>Logout</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
