import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import ListUser from "./ListUser";
import { useDispatch, useSelector } from "react-redux";
import { getListUser } from "../../store/actions/userAction";
import { SET_CURRENT_PAGE } from "../../store/constants";

function RoleAdmin() {
  const [userDetail, setUserDetail] = useState({
    email: "",
    name: "",
  });

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.appStore);

  const handleSetUserDetail = (user) => {
    setUserDetail(user);
  };

  useEffect(() => {
    dispatch(getListUser());
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: 1,
    });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="row shadow-sm containerListUser">
        <ListUser setUserDetail={(user) => handleSetUserDetail(user)} />
      </div>

      <EditUserModal userDetail={userDetail} />
      <CreateUserModal />
    </>
  );
}

export default RoleAdmin;
