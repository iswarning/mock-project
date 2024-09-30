import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { getListUser } from "../../store/actions/userAction";
import RoleAdmin from "./RoleAdmin";
import RoleUser from "./RoleUser";

function WrapperUsers() {
  const { userInfo } = useSelector((state) => state.authStore)

  return (
    <div className="container">
      {Number(userInfo?.role) === 1 ? <RoleAdmin /> : <RoleUser />}
    </div>
  );
}

export default WrapperUsers;
