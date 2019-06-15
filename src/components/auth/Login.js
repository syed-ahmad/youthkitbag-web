import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as AuthActions from '../../actions';
import classNames from 'classnames';

import Title from '../includes/Title';

class Login extends React.Component {

  renderInput(formProps) {
    const inputClasses = classNames({
      'form-control': true,
      'is-invalid': formProps.meta.touched && formProps.meta.invalid
    });

    return (
      <div className="form-group">
        <label htmlFor={formProps.input.name}>{formProps.title}</label>
        <input className={inputClasses} {...formProps.input} {...formProps} />
        <div className="invalid-feedback">{formProps.meta.error}</div>
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
            <p className="lead">If you don't have an account already, <a href="/signup">then sign up for an account</a>. Or for the forgetful, <a href="/reset">then reset your password</a>.</p>
            <div className="row">
                <div className="col-12 col-md-6 mb-3 mx-auto">
                  <form className="w-100 d-block" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field 
                      name="email" 
                      component={this.renderInput} 
                      title="Email"
                      type="email" 
                      id="email" 
                      ariadescribedby="email" 
                      autoComplete="username email" />
                    <Field 
                      name="password" 
                      component={this.renderInput} 
                      title="Password"
                      type="password" 
                      id="password" 
                      ariadescribedby="password" 
                      autoComplete="current-password" />
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

const mapStateToProps = state => ({
  authentication: state.authentication
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
})

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default reduxForm({
  form: 'login',
  validate
})(Login);