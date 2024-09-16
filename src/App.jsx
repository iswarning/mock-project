import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "./store/actions/userAction";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";

function App() {
  const dispatch = useDispatch();
  const { status, userList } = useSelector((state) => state.userStore);
  const handleClick = () => {
    dispatch(getAllUser());
  };

  console.log(process.env.VITE_API_URL);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Homes />} />
          <Route path="/products" element={<Products />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
