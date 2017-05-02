import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './authReducer';

const rootReducer = combineReducers({
  form, // form property of state produced by redux-form reducer
  auth  // auth property of state produced by authReducer
});

export default rootReducer;
