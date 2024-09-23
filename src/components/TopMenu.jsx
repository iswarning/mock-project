import React, { useState } from "react";
import imageAVT from "../assets/avatarUser.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../common/constants";
import { logout } from "../store/actions/authAction";

function TopMenu(props) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authStore);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.login);
    setIsOpen(false);
  };

  return (
    <div className="bg-white container-fluid shadow " id="topMenu">
      <div className="row">
        <div className="col-3">
          <div className="dropdownTopMenu">
            <button
              type="button"
              className="dropdownTopMenu-toggle"
              onClick={toggleDropdown}
            >
              <span className="smallScreenSpan">{userInfo.name}</span>
              <img src={imageAVT} alt="" />
            </button>
            {isOpen && (
              <ul className="dropdownTopMenu-menu">
                <li>list info</li>
                <li className="logout ">
                  <button
                    type="button"
                    className="btn "
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="col-9 text-align-items-center ">
          <h1>Header</h1>
        </div>
      </div>
    </div>
  );
}

export default TopMenu;
