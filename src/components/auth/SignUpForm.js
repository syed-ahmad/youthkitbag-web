import React from 'react';
import useForm from '../hooks/useForm';
import { signup } from '../../actions/AuthActions';
import validate from './SignUpFormValidationRules';
import { useDispatch } from 'react-redux';

const SignUpForm = () => {

  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  const {
    values,
    handleChange,
    handleSubmit,
    errors
  } = useForm(initialValues, resetSubmit, validate);

  function resetSubmit() {
    const { email, password, confirmPassword } = values;
    dispatch(signup(email, password, confirmPassword));
  }

  return (
    <form className="w-100 d-block" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input className={`form-control ${errors.email && 'is-invalid'}`} name="email" type="email" onChange={handleChange} value={values.email} aria-describedby="email" autoComplete="username email" required />
        {errors.email && (
          <div className="invalid-feedback">{errors.email}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input className={`form-control ${errors.email && 'is-invalid'}`} name="password" type="password" onChange={handleChange} value={values.password} aria-describedby="password" autoComplete="current-password" required />
        {errors.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Password</label>
        <input className={`form-control ${errors.confirmPassword && 'is-invalid'}`} name="confirmPassword" type="password" onChange={handleChange} value={values.confirmPassword} aria-describedby="confirmPassword" autoComplete="new-password" required />
        {errors.confirmPassword && (
          <div className="invalid-feedback">{errors.confirmPassword}</div>
        )}
      </div>
      <button className="btn btn-primary" type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;