import React from 'react';
import useForm from '../hooks/useForm';
import { newPassword } from '../../actions/AuthActions';
import validate from './ResetFormValidationRules';
import { useDispatch } from 'react-redux';

const NewPasswordForm = () => {

  const dispatch = useDispatch();

  const initialValues = {
    password: ''
  };

  const { 
    values,
    handleChange,
    handleSubmit,
    errors
  } = useForm(initialValues, newPasswordSubmit, validate);

  function newPasswordSubmit() {
    dispatch(newPassword(values.password));
  }

  return (
    <form className="w-100 d-block" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="password">New Password</label>
        <input className={`form-control ${errors.email && 'is-invalid'}`} name="password" type="password" onChange={handleChange} value={values.password} aria-describedby="password" autoComplete="current-password" required />
        {errors.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}
      </div>
      <button className="btn btn-primary" type="submit">Update Password</button>
    </form>
  );
}

export default NewPasswordForm;