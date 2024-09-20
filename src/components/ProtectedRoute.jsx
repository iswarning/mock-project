import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const accessToken = localStorage.getItem('access_token') ?? null
    return accessToken ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute