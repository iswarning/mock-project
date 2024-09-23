import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./common/constants";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home/Home";
import WrapperLogin from "./pages/login/WrapperLogin";
import Products from "./pages/products/Products";
import Users from "./pages/users/WrapperUsers";
import Dashboard from "./pages/dashboard/Dashboard";
import Tasks from "./pages/tasks/Tasks";
import RoleAdmin from "./pages/users/RoleAdmin";
import RoleUser from "./pages/users/RoleUser";

function App() {
  return (
    <BrowserRouter>
      {/* <RoleUser /> */}
      <Routes>
        <Route path={ROUTES.login} element={<WrapperLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.products} element={<Products />} />
          <Route path={ROUTES.users} element={<Users />} />
          <Route path={ROUTES.dashboard} element={<Dashboard />} />
          <Route path={ROUTES.tasks} element={<Tasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
