import { useSelector } from "react-redux";
import RoleAdmin from "./RoleAdmin";
import RoleUser from "./RoleUser";

function WrapperUsers() {
  const { userInfo } = useSelector((state) => state.authStore);

  return (
    <div className="container">
      {Number(userInfo?.role) === 1 ? <RoleAdmin /> : <RoleUser />}
    </div>
  );
}

export default WrapperUsers;
