import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HOME_PATH } from '../utils/routes';

const NoSessionRoutes = () => {
  const { session } = useSelector((state) => state.user);
  const loadingCounter = useSelector((state) => state.loader.loadingCounter);

  if (!session && loadingCounter === 0) {
    return <Outlet />;
  } else if (session) {
    return <Navigate to={HOME_PATH} />;
  }
};

export default NoSessionRoutes;
