import { createStore } from 'redux';
import allReducers from './reducers/index'; // eslint-disable-line import/extensions

const store = () => createStore(allReducers);

export default store;
