import { useSelector } from "react-redux";
import RoleAdmin from "./RoleAdmin";

function WrapperUsers() {
  const { userInfo } = useSelector((state) => state.authStore);
  const { listUser } = useSelector((state) => state.userStore);
  console.log(listUser);

  return (
    <div className="container">
      {Number(userInfo?.role) === 1 ? <RoleAdmin /> : null}
    </div>
  );
}

export default WrapperUsers;
