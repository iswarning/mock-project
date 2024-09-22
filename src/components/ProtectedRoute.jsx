import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const { userInfo } = useSelector((state) => state.authStore)
    const isAuthenticated = localStorage.getItem('access_token') || userInfo || null
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute