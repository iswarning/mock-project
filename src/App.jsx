import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./common/constants";
import LeftMenu from "./components/LeftMenu";
import ProtectedRoute from "./components/ProtectedRoute";
import TopMenu from "./components/TopMenu";
import Home from "./pages/home/Home";
import WrapperLogin from "./pages/login/WrapperLogin";
import Products from "./pages/products/Products";
import Users from "./pages/users/Users";
import Dashboard from "./pages/dashboard/Dashboard";
import Tasks from "./pages/tasks/Tasks";
import RoleAdmin from "./pages/users/RoleAdmin";

function App() {
  return (
    <BrowserRouter>
      <TopMenu />
      <div className="row m-0 p-0">
        <LeftMenu />
        <div className="col-10 mt-3 ps-4">
          <Routes>
            <Route path={ROUTES.login} element={<WrapperLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route path={ROUTES.home} element={<Home />} />
              <Route path={ROUTES.products} element={<Products />} />
              <Route path={ROUTES.users} element={<RoleAdmin />} />
              <Route path={ROUTES.dashboard} element={<Dashboard />} />
              <Route path={ROUTES.tasks} element={<Tasks />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
