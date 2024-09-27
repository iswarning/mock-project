import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import imageAVT from "../../../assets/avatarUser.png";
import { ROUTES } from "../../../common/constants";
import { logout } from "../../../store/actions/authAction";
import "./style.scss";

function Header({ openSidebar }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authStore);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.login);
    setIsOpen(false);
  };

  return (
    <div className="bg-white shadow container-fruit">
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
            <div className="dropdownHeader">
              <button
                type="button"
                className="dropdownHeader-toggle"
                onClick={() => toggleDropdown()}
              >
                <span className="smallScreenSpan">{userInfo?.name}</span>
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
