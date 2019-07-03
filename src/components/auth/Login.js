import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, ErrorMessage, Form, Field } from 'formik'
import { login } from '../../actions';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import Title from '../includes/Title';

const initialValues = { 
  email: '', 
  password: ''
};

const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(5,"Password must be at least 5 characters")
});

class Login extends React.Component {

  onSubmit = (values, { setSubmitting }) => {
    this.props.login(values.email, values.password);
    setSubmitting(false);
  };

  renderAlert = () => {
    if (!this.props.toast.currentError.message)
      return null;

    return (
      <div className="alert alert-danger" role="alert">
        {this.props.toast.currentError.message}
      </div>
    );
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
                <Formik initialValues={initialValues} validationSchema={loginValidation} onSubmit={this.onSubmit}>
                  {({ values, errors, touched, handleChange, handleBlur, handleSubmit, handleReset, isSubmitting }) => (
                    <Form className="w-100 d-block">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email"  className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                          aria-describedby="email" autoComplete="username email" placeholder="Email address" />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                          aria-describedby="password" autoComplete="current-password" placeholder="Password" />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                      </div>
                      <button className="btn btn-primary mr-1" type="submit">Login</button>
                      <button className="btn btn-outline-secondary" type="button" onClick={handleReset} >Reset</button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { toast: state.toast };
}

export default connect(mapStateToProps, { login })(Login);