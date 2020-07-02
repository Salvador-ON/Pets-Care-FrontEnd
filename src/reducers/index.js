import { combineReducers } from 'redux';
import loggedInStatus from './loggedInStatus';

const allReducers = combineReducers({
  loggedInStatus,
});

export default allReducers;
