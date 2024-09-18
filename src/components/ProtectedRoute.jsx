import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN_STATUS } from "../store/constants";

function ProtectedRoute() {
    const { loginStatus } = useSelector((state) => state.loginStore);
    return loginStatus === LOGIN_STATUS.SUCCESS ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute