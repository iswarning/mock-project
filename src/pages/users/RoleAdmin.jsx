import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import ListUser from "./ListUser";
import { useDispatch, useSelector } from "react-redux";
import { getListUser } from "../../store/actions/userAction";

function RoleAdmin() {
  
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

  const [userDetail, setUserDetail] = useState(null); 

  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.appStore)

  const style = {
    backgroundColor: 'white',
    borderRadius: '10px',
    paddingTop: '10px',
    paddingRight: '10px',
  }

  const handleSetUserDetail = (user) => {
    setUserDetail(user)
  }

  useEffect(() => {
    dispatch(getListUser())
  },[])

  if (isLoading) return <Loading />

  return (
    <>
      <div className="row" style={style}>
        
        <ListUser 
          setUserDetail={(user) => handleSetUserDetail(user)}
        /> 
        
      </div>
      {userDetail && (
        <EditUserModal
          userDetail={userDetail}
        />
      )}
      <CreateUserModal />
    </>
  );
}

export default RoleAdmin
