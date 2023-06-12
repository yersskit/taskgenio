import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LOGIN_PATH } from '../utils/routes';

const WithUserRoutes = () => {
  const { session } = useSelector((state) => state.user);
  const loadingCounter = useSelector((state) => state.loader.loadingCounter);

  if (session) {
    return <Outlet />;
  } else if (!session && loadingCounter === 0) {
    return <Navigate to={LOGIN_PATH} />;
  }
};

export default WithUserRoutes;
