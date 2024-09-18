import { useDispatch } from "react-redux";
import { login, signUp } from "./store/actions/userAction";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home/Home";

function App() {
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/products" element={<Products />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/checkout" element={<Checkout />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
