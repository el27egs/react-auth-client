import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  form // form property of state produced by redux-form reducer
});

export default rootReducer;
