import {createStore, combineReducers} from 'redux';
import userTokenReducer from './components/Reducers/userTokenReducer';
import dataReducer from './components/Reducers/dataReducer';

export default createStore(
  combineReducers({
    userTokenReducer,
    dataReducer,
  }),
);
