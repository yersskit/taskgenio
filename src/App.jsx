import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
// import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { HashRouter } from 'react-router-dom';
// import { store, history } from './store';
import { store } from './store';
import Projects from './views/Projects';
import Home from './views/Home';
import Teams from './views/Teams';
import {
  FORGET_PATH,
  HOME_PATH,
  LOGIN_PATH,
  PROJECTS_PATH,
  REGISTER_PATH,
  RESET_PATH,
  SETTINGS_PATH,
  TEAMS_PATH
} from './utils/routes';
import WithUserRoutes from './routes/WithUserRoutes';
import NoSessionRoutes from './routes/NoSessionRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { getLoggedInUser } from './store/user';
import Login from './views/Login';
import Register from './views/Register';
import Forget from './views/Forget';
import Reset from './views/Reset';
import { decrementLoadingCounter, incrementLoadingCounter } from './store/loader';
import Loader from './components/Common/Loader';
import Team from './views/Team';
import Settings from './views/Settings';
import Project from './views/Project';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  dispatch(incrementLoadingCounter());

  const getSession = async () => {
    await dispatch(getLoggedInUser());
    dispatch(decrementLoadingCounter());
  };

  getSession();

  return children;
};

const App = () => (
  <Provider store={store}>
    <HashRouter>
      {/* <Router history={history}> */}
      <Loader />
      <AuthProvider>
        <Routes>
          <Route element={<WithUserRoutes />}>
            <Route element={<Home />} path={HOME_PATH} />
            <Route element={<Projects />} path={PROJECTS_PATH} />
            <Route element={<Project />} path={`${PROJECTS_PATH}/:projectId`} />
            <Route element={<Teams />} path={TEAMS_PATH} />
            <Route element={<Team />} path={`${TEAMS_PATH}/:teamId`} />
          </Route>
          <Route element={<NoSessionRoutes />}>
            <Route element={<Login />} path={LOGIN_PATH} />
            <Route element={<Register />} path={REGISTER_PATH} />
            <Route element={<Forget />} path={FORGET_PATH} />
            <Route element={<Reset />} path={RESET_PATH} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route element={<Settings />} path={SETTINGS_PATH} />
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  </Provider>
);

export default App;