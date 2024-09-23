import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import TopMenu from "./TopMenu";
import LeftMenu from "./LeftMenu";

function ProtectedRoute() {
  const { userInfo } = useSelector((state) => state.authStore);
  const isAuthenticated =
    localStorage.getItem("access_token") || userInfo || null;
  return isAuthenticated ? (
    <>
      <TopMenu />
      <div className="row m-0 p-0">
        <LeftMenu />
        <div className="col-10 mt-3 ps-4">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
