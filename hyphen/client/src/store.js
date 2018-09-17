import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import authReducer from './Containers/AuthContainer/Auth.duck';
import profileReducer from './Containers/ProfileContainer/profile.duck';

const history = createHistory();
const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  profile: profileReducer,
});

const middleware = [
  thunk,
  routerMiddleware(history),
]

const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  if (typeof window.devToolsExtension === 'function') {
    enhancers.push(window.devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(rootReducer, {}, composedEnhancers);
