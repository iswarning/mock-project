import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './common/constants';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/home/Home';
import WrapperLogin from './pages/login/WrapperLogin';
import Products from './pages/products/Products';
import WrapperProjects from './pages/projects/WrapperProjects';
import Tasks from './pages/tasks/Tasks';
import Users from './pages/users/WrapperUsers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.login} element={<WrapperLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.products} element={<Products />} />
          <Route path={ROUTES.users} element={<Users />} />
          <Route path={ROUTES.dashboard} element={<Dashboard />} />
          <Route path={ROUTES.tasks} element={<Tasks />} />
          <Route path={ROUTES.projects} element={<WrapperProjects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
