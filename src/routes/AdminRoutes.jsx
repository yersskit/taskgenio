import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HOME_PATH } from '../utils/routes';

const AdminRoutes = () => {
  const { session } = useSelector((state) => state.user);
  const loadingCounter = useSelector((state) => state.loader.loadingCounter);

  if (session && session.prefs && session.prefs.admin) {
    return <Outlet />;
  } else if (loadingCounter === 0) {
    return <Navigate to={HOME_PATH} />;
  }
};

export default AdminRoutes;
