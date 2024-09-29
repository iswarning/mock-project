import { Navigate, Outlet } from "react-router-dom";
import Header from "../pages/theme/Header/Header";
import LeftMenu from "../pages/theme/LeftMenu/LeftMenu";
import { useState } from "react";

function ProtectedRoute() {
  const accessToken = localStorage.getItem("access_token");
  const [sidebarOpen, setSidebarOpen] = useState(false);

    if (accessToken) {

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
