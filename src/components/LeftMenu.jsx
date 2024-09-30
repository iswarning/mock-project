import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../common/constants';
import { useSelector } from 'react-redux';

function LeftMenu(props) {
  const { userInfo } = useSelector((state) => state.authStore);

  return (
    <div className="col-2  px-0 shadow">
      <div id="leftMenu">
        <ul className=" m-0 p-0 pt-3">
          <li className={userInfo?.role === 1 ? 'd-block' : 'd-none'}>
            <NavLink
              to={ROUTES.dashboard}
              className={({ isActive }) => (isActive ? 'btn text-menu active' : 'btn text-menu')}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.users}
              className={({ isActive }) => (isActive ? 'btn text-menu active' : 'btn text-menu')}
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.products}
              className={({ isActive }) => (isActive ? 'btn text-menu active' : 'btn text-menu')}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.tasks}
              className={({ isActive }) => (isActive ? 'btn text-menu active' : 'btn text-menu')}
            >
              Tasks
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.projects}
              className={({ isActive }) => (isActive ? 'btn text-menu active' : 'btn text-menu')}
            >
              Projects
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftMenu;
