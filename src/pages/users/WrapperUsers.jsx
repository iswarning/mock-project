import { useSelector } from "react-redux";
import RoleAdmin from "./RoleAdmin";

function WrapperUsers() {
  const { userInfo } = useSelector((state) => state.authStore);

  return (
    <div className="container">
      {Number(userInfo?.role) === 1 ? <RoleAdmin /> : null}
    </div>
  );
}

export default WrapperUsers;
