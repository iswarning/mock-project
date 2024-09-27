import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../common/constants";
import { useSelector } from "react-redux";
import "./style.scss";

function LeftMenu({ sidebarOpen, closeSidebar }) {
  const { userInfo } = useSelector((state) => state.authStore);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeSidebar]);

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${sidebarOpen ? "open" : ""} shadow`}
    >
      <ul className="m-0 p-0 pt-3">
        {userInfo?.role === 1 && (
          <li>
            <NavLink
              to={ROUTES.dashboard}
              className={({ isActive }) =>
                isActive ? "btn text-menu active" : "btn text-menu"
              }
            >
              <i class="fa-solid fa-house"></i>
              <span className="textMenuBig">Dashboard</span>
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to={ROUTES.users}
            className={({ isActive }) =>
              isActive ? "btn text-menu active" : "btn text-menu"
            }
          >
            <i class="fa-solid fa-user"></i>
            <span className="textMenuBig">Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTES.project}
            className={({ isActive }) =>
              isActive ? "btn text-menu active" : "btn text-menu"
            }
          >
            <i class="fa-solid fa-diagram-project"></i>
            <span className="textMenuBig">Project</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTES.tasks}
            className={({ isActive }) =>
              isActive ? "btn text-menu active" : "btn text-menu"
            }
          >
            <i class="fa-solid fa-list-check"></i>
            <span className="textMenuBig">Tasks</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default LeftMenu;
