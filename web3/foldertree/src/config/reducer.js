import { combineReducers } from 'redux';
import appReducer from '../App_duck';

const reducer = combineReducers({
  app: appReducer
});

export default reducer;
