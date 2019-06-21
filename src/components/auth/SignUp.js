import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../../actions';
import classNames from 'classnames';

import Title from '../includes/Title';

class SignUp extends React.Component {

  renderInput({ input, meta, label, type, autoComplete }) {
    const inputClasses = classNames({
      'form-control': true,
      'is-invalid': meta.touched && meta.invalid
    });

    return (
      <div className="form-group">
        <label htmlFor={input.name}>{label}</label>
        <input type={type} className={inputClasses} id={input.name} aria-describedby={input.name} {...input} autoComplete={autoComplete} />
        <div className="invalid-feedback">{meta.error}</div>
      </div>
    );
  }

  renderAlert = () => {
    console.log(this.props.auth);
    if (!this.props.auth.signupFailed || !this.props.auth.signupError)
      return null;

    return (
      <div class="alert alert-danger" role="alert">
        {this.props.auth.signupError.data.message}
      </div>
    );
  }

  onSubmit = (formValues) => {
    const { email, password, confirmPassword } = formValues;
    this.props.actions.signup(email, password, confirmPassword);
  }

  render() {
    return (
      <div>
        <Title title="Sign Up" />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <p className="lead">If you already have an account, <Link to="/auth/login">then login to access your account</Link>.</p>
            <div className="row">
              <div className="col-12 col-md-6 mb-3 mx-auto">
                {this.renderAlert()}
                <form className="w-100 d-block" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                  <Field name="email" component={this.renderInput} label="Email" type="email" autoComplete="username email" />
                  <Field name="password" component={this.renderInput} label="Password" type="password" autoComplete="current-password" />
                  <Field name="confirmPassword" component={this.renderInput} label="Confirm Password" type="password" autoComplete="new-password" />
                  <button className="btn btn-primary" type="submit">Sign Up</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = [];

  if (!formValues.email) {
    errors.email = 'Please enter a valid email';
  }

  if (!formValues.password) {
    errors.password = 'Please enter a valid password';
  }

  if (!formValues.confirmPassword) {
    errors.confirmPassword = 'Please re-confirm your password';
  }

  if (formValues.password && formValues.confirmPassword && formValues.password !== formValues.confirmPassword) {
    errors.confirmPassword = 'Confirm password must match password';
  }

  return errors;
}

const mapStateToProps = state => {
  return { auth: state.auth };
}

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(AuthActions, dispatch) };
}

SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default reduxForm({
  form: 'signup',
  validate
})(SignUp);