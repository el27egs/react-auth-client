import axios from 'axios';

const URL = 'http://localhost:3000';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // submit email/password to server; signin is defined in server
    axios.post(`${URL}/signin`, { email, password });
    // if req is ok
    // - update state to indicate user is auth'd
    // - save JWT token
    // - redirect to the route /feature

    // if req is bad, show error to user

  }
}
