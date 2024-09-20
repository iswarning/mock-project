import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home/Home";
import WrapperLogin from "./pages/login/WrapperLogin";
import { ROUTES } from "./common/constants";

function App() {
  // const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.login} element={<WrapperLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.home} element={<Home />} />
          {/* <Route path="/products" element={<Products />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/checkout" element={<Checkout />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
