import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions';

class Signup extends Component {
  render(){
    const {
      handleSubmit,
      fields: { email, password, passwordConfirm }
    }   = this.props;

    return(
      <form>
        <fieldset className="form-group">
          <label>Email:</label>
          {/* ...email gives control over this input to reduxForm */}
          <input className="form-control" {...email} />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          {/* ...password gives control over this input to reduxForm */}
          <input className="form-control" type="password" {...password} />
          {/* password.~ below is ref to pw helper from reduxForm */}
          {/* & if validate() returns errors, it's assigned to errror property of specific field */}
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          {/* ...passwordConfirm gives control over this input to reduxForm */}
          <input className="form-control" type="password" {...passwordConfirm} />
        </fieldset>
        <button action="submit" className="btn btn-primary">Do</button>
      </form>
    );
  }
}

function validate(formProps) {
  // this obj will contain any errors found in form fields:
  const errors = {};

  console.log(formProps);

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Password and Confirm Password fields must match.';
  }

  return errors;
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(Signup);
