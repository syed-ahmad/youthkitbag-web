import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../../actions';
import classNames from 'classnames';

import Title from '../includes/Title';

class Login extends React.Component {

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
    if (!this.props.auth.loginFailed || !this.props.auth.loginError)
      return null;

    return (
      <div className="alert alert-danger" role="alert">
        {this.props.auth.loginError.data.message}
      </div>
    );
  }

  onSubmit = (formValues) => {
    const { email, password } = formValues;
    this.props.actions.login(email, password);
  }

  render() {
    return (
      <div>
        <Title title="Login" />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <p className="lead">If you don't have an account already, <Link to="/auth/signup">then sign up for an account</Link>. Or for the forgetful, <Link to="/auth/reset">then reset your password</Link>.</p>
            <div className="row">
              <div className="col-12 col-md-6 mb-3 mx-auto">
                {this.renderAlert()}
                <form className="w-100 d-block" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                  <Field name="email" component={this.renderInput} label="Email" type="email" autoComplete="username email" />
                  <Field name="password" component={this.renderInput} label="Password" type="password" autoComplete="current-password" />
                  <button className="btn btn-primary" type="submit">Login</button>
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
  const errors = {};

  if (!formValues.email) {
    errors.email = 'Please enter a valid email';
  }

  if (!formValues.password) {
    errors.password = 'Please enter a valid password';
  }

  return errors;
}

const mapStateToProps = state => {
  return { auth: state.auth };
}

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(AuthActions, dispatch) };
}

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default reduxForm({
  form: 'login',
  validate
})(Login);