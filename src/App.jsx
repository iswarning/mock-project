import { useDispatch } from "react-redux";
import { login, signUp } from "./store/actions/userAction";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Route path="/login" element={<Login />} />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
