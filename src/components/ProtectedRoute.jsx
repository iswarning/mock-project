import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_USER_INFO } from "../store/constants";
import { jwtDecode } from "jwt-decode";
import Header from "../pages/theme/Header/Header";
import LeftMenu from "../pages/theme/LeftMenu/LeftMenu";
import { useState } from "react";

function ProtectedRoute() {
  const accessToken = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (accessToken) {
    // Decode JWT and set user info in Redux store
    dispatch({
      type: SET_USER_INFO,
      payload: jwtDecode(accessToken),
    });

    return (
      <>
        <Header openSidebar={() => setSidebarOpen(true)} />
        <div className="d-flex w-100">
          <LeftMenu
            sidebarOpen={sidebarOpen}
            closeSidebar={() => setSidebarOpen(false)}
          />
          <div className="main-content">
            <Outlet />
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
