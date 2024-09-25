import { Navigate, Outlet } from "react-router-dom";
import TopMenu from "./TopMenu";
import LeftMenu from "./LeftMenu";
import { useDispatch } from "react-redux";
import { SET_USER_INFO } from "../store/constants";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute() {
  const accessToken = localStorage.getItem("access_token");
  const dispatch = useDispatch();

  const render = () => {
    if (accessToken) {
      dispatch({
        type: SET_USER_INFO,
        payload: jwtDecode(accessToken),
      })

      return (
        <>
          <TopMenu />
          <div className="row m-0 p-0">
            <LeftMenu />
            <div className="col-10 mt-3 ps-4">
              <Outlet />
            </div>
          </div>
        </>
      )
    } else {
      return <Navigate to="/login" />
    }
  }

  return render()
}

export default ProtectedRoute;
