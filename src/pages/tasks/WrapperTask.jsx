import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getListTask } from "../../store/actions/taskAction"
import { useSelector } from "react-redux"
import TasksRoleAdmin from "./TasksRoleAdmin"
import TasksRoleUser from "./TasksRoleUser"
import Loading from "../../components/Loading"

function WrapperTask() {
    const dispatch = useDispatch()
    const {userInfo} = useSelector((state) => state.authStore)
    const {isLoading} = useSelector((state) => state.appStore)

    useEffect(() => {
        dispatch(getListTask())
    },[])

    if (isLoading) return <Loading />

  return (
    <>
        {
            Number(userInfo.role) === 1 ? <TasksRoleAdmin /> : <TasksRoleUser />
        }
    </>
  )
}

export default WrapperTask