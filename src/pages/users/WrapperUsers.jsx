import { useSelector } from "react-redux";
import RoleAdmin from "./RoleAdmin";
import Loading from "../../components/Loading";

function WrapperUsers() {
  const { userInfo } = useSelector((state) => state.authStore);
  const { isLoading } = useSelector((state) => state.appStore);

  return (
    <div className="container">
      {Number(userInfo?.role) === 1 ? <RoleAdmin /> : null}
      {isLoading && <Loading />}
    </div>
  );
}

export default WrapperUsers;
