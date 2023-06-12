import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import tasks from './tasks';
import layout from './layout';
import user from './user';
import loader from './loader';
import teams from './teams';
import toast from './toast';
import projects from './projects';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory()
});

const rootReducer = combineReducers({
  router: routerReducer,
  tasks,
  layout,
  user,
  loader,
  teams,
  toast,
  projects
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([routerMiddleware])
});

export const history = createReduxHistory(store);
