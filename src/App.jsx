import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "./store/actions/userAction";

function App() {
  const dispatch = useDispatch();
  const { status, userList } = useSelector((state) => state.userStore);
  const handleClick = () => {
    dispatch(getAllUser());
  };

  console.log(status, userList);
  //sdsdsds
  return (
    <div>
      <h1>Hello</h1>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        CLICK me
      </button>
    </div>
  );
}

export default App;
