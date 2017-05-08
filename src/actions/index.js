import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

const URL = 'http://localhost:3000';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // submit email/password to server; signin is defined in server
    axios.post(`${URL}/signin`, { email, password })
      .then( response => {
        // if req is ok
        // - update state to indicate user is auth'd
        dispatch({ type: AUTH_USER });
        // - save JWT token into localStorage:
        localStorage.setItem('token', response.data.token);
        // - redirect to the route /feature:
        browserHistory.push('/feature');
      })
      .catch( () => {
        // if req is bad, show error to user
        dispatch(authError('Incorrect Email or Password'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${URL}/signup`, { email, password })
      .then( response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch( error => dispatch(authError(error.response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  // delete token from localStorage:
  localStorage.removeItem('token');
  // and set this.state.authenticated to false:
  return { type: UNAUTH_USER };
}
