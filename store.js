import {createStore, combineReducers} from 'redux';
import userTokenReducer from './components/Reducers/userTokenReducer';
import dataReducer from './components/Reducers/dataReducer';
import userProfileImageReducer from './components/Reducers/userProfileImageReducer';

export default createStore(
  combineReducers({
    userTokenReducer,
    dataReducer,
    userProfileImageReducer,
  }),
);
