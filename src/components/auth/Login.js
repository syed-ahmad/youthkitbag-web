import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik'
import { login } from '../../actions';
import { connect } from 'react-redux';

import Title from '../includes/Title';

class Login extends React.Component {

  // onSubmit = (values, { props = this.props, setSubmitting }) => {
  //   //process form submission here
  //   console.log(formProps);
  //   //done submitting, set submitting to false
  //   setSubmitting(false);
  //   return;
  // }

  render() {
    return (
      <div>
        <Title title="Login" />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <p className="lead">If you don't have an account already, <Link to="/auth/signup">then sign up for an account</Link>. Or for the forgetful, <Link to="/auth/reset">then reset your password</Link>.</p>
            <div className="row">
              <div className="col-12 col-md-6 mb-3 mx-auto">
                {/* {this.renderAlert()} */}
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validate={(values) => {
                    let errors = [];
                    if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                      errors.email = 'Please enter a valid email';
                    }
                    if (!values.password) {
                      errors.password = 'Please enter a valid password';
                    }                  
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log('authaction');
                    this.props.login(values.email, values.password);
                    setSubmitting(false);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form className="w-100 d-block" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          id="email" 
                          aria-describedby="email" 
                          autoComplete="username email" 
                          placeholder="Email address" 
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {errors.email && touched.email && errors.email}
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password" 
                          className="form-control" 
                          id="password" 
                          aria-describedby="password" 
                          autoComplete="current-password" 
                          placeholder="Password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                      </div>
                      <button className="btn btn-primary" type="submit">Login</button>
                    </form>
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



  // renderInput({ input, meta, label, type, autoComplete }) {
  //   // const inputClasses = classNames({
  //   //   'form-control': true,
  //   //   'is-invalid': meta.touched && meta.invalid
  //   // });
  // }

  // renderAlert = () => {
  //   console.log(this.props.auth);
  //   if (!this.props.auth.loginFailed || !this.props.auth.loginError)
  //     return null;

  //   return (
  //     <div className="alert alert-danger" role="alert">
  //       {this.props.auth.loginError.data.message}
  //     </div>
  //   );
  // }

  // onSubmit = (formValues) => {
  //   const { email, password } = formValues;
  //   this.props.actions.login(email, password);
  // }




// const validate = formValues => {
//   const errors = {};

//   if (!formValues.email) {
//     errors.email = 'Please enter a valid email';
//   }

//   if (!formValues.password) {
//     errors.password = 'Please enter a valid password';
//   }

//   return errors;
// }

// const mapStateToProps = state => {
//   return { auth: state.auth };
// }

// const mapDispatchToProps = dispatch => {
//   return { actions: bindActionCreators(AuthActions, dispatch) };
// }

// Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default connect(null, { login })(Login);