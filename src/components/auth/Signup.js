import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import * as actions from '../../actions';

class Signup extends Component {
  // if form isn't valid, reduxForm prevents handleSubmit from being called
  handleFormSubmit(formProps) {
    // call action creator signupUser:
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>{this.props.errorMessage}</strong>
        </div>
      );
    }
  }

  render(){
    const {
      handleSubmit,
      fields: { email, password, passwordConfirm }
    } = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          {/* ...email gives control over this input to reduxForm */}
          <input className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}
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
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Do</button>
      </form>
    );
  }
}

function validate(formProps) {
  // will contain any errors found in form fields:
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email.'
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password.'
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please reenter your email.'
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Password and Confirm Password fields must match.';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
