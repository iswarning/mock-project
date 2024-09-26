import { useDispatch, useSelector } from "react-redux";
import RoleAdmin from "./RoleAdmin";
import RoleUser from "./RoleUser";
import { useEffect } from "react";
import { getListUser } from "../../store/actions/userAction";
import Loading from "../../components/Loading";

function WrapperUsers() {

  const { userInfo } = useSelector((state) => state.authStore)
  const { isLoading } = useSelector((state) => state.appStore)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getListUser())
  },[])

  if (isLoading) return <Loading />  
  
  return (
    <div className="container">
      {
        Number(userInfo?.role) === 1 ? <RoleAdmin /> : <RoleUser />
      }
    </div>
  );
}

export default WrapperUsers;
