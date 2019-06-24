import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../../actions';
import classNames from 'classnames';

import Title from '../includes/Title';

class NewPassword extends React.Component {

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
    if (!this.props.auth.newPasswordFailed || !this.props.auth.newPasswordError)
      return null;

    return (
      <div className="alert alert-danger" role="alert">
        {this.props.auth.newPasswordError.data.message}
      </div>
    );
  }

  onSubmit = (formValues) => {
    const { password } = formValues;
    this.props.actions.newPassword(password);
  }

  render() {
    return (
      <div>
        <Title title="Set a new password"/>
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 mb-3 mx-auto">
                {this.renderAlert()}
                <form className="w-100 d-block" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                  <Field name="password" component={this.renderInput} label="Password" type="password" autoComplete="current-password" />
                  <button className="btn btn-primary" type="submit">Update Password</button>
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

NewPassword = connect(mapStateToProps, mapDispatchToProps)(NewPassword);

export default reduxForm({
  form: 'newpassword',
  validate
})(NewPassword);