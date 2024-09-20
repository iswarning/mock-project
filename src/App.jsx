import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./common/constants";
import LeftMenu from "./components/LeftMenu";
import ProtectedRoute from "./components/ProtectedRoute";
import TopMenu from "./components/TopMenu";
import Home from "./pages/home/Home";
import WrapperLogin from "./pages/login/WrapperLogin";

function App() {
  // const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <TopMenu />
      <div className="row m-0 p-0">
        <LeftMenu />
        <Routes>
          <Route path={ROUTES.login} element={<WrapperLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.home} element={<Home />} />
            {/* <Route path="/products" element={<Products />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/checkout" element={<Checkout />} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
