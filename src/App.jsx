import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home/Home";
import WrapperLogin from "./pages/login/WrapperLogin";
import TopMenu from "./components/TopMenu";
import LeftMenu from "./components/LeftMenu";

function App() {
  // const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <TopMenu />
      <div className="row m-0 p-0">
        <LeftMenu />
        <Routes>
          <Route path="/login" element={<WrapperLogin />} />
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/" element={<Home />} />
          {/* </Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
