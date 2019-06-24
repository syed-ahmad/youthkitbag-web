import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../../actions';
import classNames from 'classnames';

import Title from '../includes/Title';

class Reset extends React.Component {

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
    if (!this.props.auth.resetFailed || !this.props.auth.resetError)
      return null;

    return (
      <div className="alert alert-danger" role="alert">
        {this.props.auth.resetError.data.message}
      </div>
    );
  }

  onSubmit = (formValues) => {
    const { email } = formValues;
    this.props.actions.reset(email);
  }

  render() {
    return (
      <div>
        <Title title="Reset your password" />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 mb-3 mx-auto">
                <form className="w-100 d-block" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                  <Field name="email" component={this.renderInput} label="Email" type="email" autoComplete="username email" />
                  <button className="btn btn-primary" type="submit">Reset Password</button>
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

  return errors;
}

const mapStateToProps = state => {
  return { auth: state.auth };
}

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(AuthActions, dispatch) };
}

Reset = connect(mapStateToProps, mapDispatchToProps)(Reset);

export default reduxForm({
  form: 'reset',
  validate
})(Reset);
