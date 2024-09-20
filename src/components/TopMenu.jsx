import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function TopMenu(props) {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("home");

  const handleHome = () => {
    setActiveMenu("home");
    navigate("/");
  };

  return (
    <div className="bg-white container-fluid shadow py-2   ">
      <div className="container">
        <div className="row">
          <div className="col-5 text-align-items-center ">
            <ul className="d-flex m-0 ">
              <li>
                <button
                  className={` btn text-menu ${
                    activeMenu === "home" ? "active" : ""
                  }`}
                  onClick={() => handleHome()}
                >
                  Home
                  <span></span>
                </button>
              </li>
              <li>
                <button
                  className={` btn text-menu ${
                    activeMenu === "product" ? "active" : ""
                  }`}
                >
                  Product
                  <span></span>
                </button>
              </li>
            </ul>
          </div>
          <div className="col-2 text-center ">
            <span className="logo ">
              <img src={logo} alt="" className="logo" />
            </span>
          </div>
          <div className="col-5 text-align-items-center  ">
            <div className="text-end w-100">Search</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopMenu;
