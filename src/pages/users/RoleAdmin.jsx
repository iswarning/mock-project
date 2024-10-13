import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import ListUser from "./ListUser";
import { useState } from "react";

function RoleAdmin() {

  const { isLoading } = useSelector((state) => state.appStore);
  const [userEdit, setUserEdit] = useState({
    name: '',
    email: '',
    password: '',
    avarta: null
  })

  const style = {
    backgroundColor: "white",
    borderRadius: "10px",
    paddingTop: "10px",
    paddingRight: "10px",
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="row shadow-sm" style={style}>
        <ListUser setUserEdit={setUserEdit} />
      </div>

      <EditUserModal userEdit={userEdit} setUserEdit={setUserEdit} />
      <CreateUserModal />
    </>
  );
}

export default RoleAdmin;
