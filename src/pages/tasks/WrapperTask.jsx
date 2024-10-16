import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getListTask, getListTaskByUserId } from "../../store/actions/taskAction"
import { useSelector } from "react-redux"
import TasksRoleAdmin from "./TasksRoleAdmin"
import TasksRoleUser from "./TasksRoleUser"
import Loading from "../../components/Loading"
import { getProjectsData } from "../../store/actions/projectAction"

function WrapperTask() {
    const dispatch = useDispatch()
    const {userInfo} = useSelector((state) => state.authStore)
    const {isLoading} = useSelector((state) => state.appStore)

    useEffect(() => {
        if (Number(userInfo.role) === 1) {
          dispatch(getListTask())
          dispatch(getProjectsData())
        } else {
          dispatch(getListTaskByUserId({ userId: userInfo.id }))
        }
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