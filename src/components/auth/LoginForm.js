import React from "react";
import useForm from "../hooks/useForm";
import { login } from "../../actions/AuthActions";
import validate from "./LoginFormValidationRules";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: ""
  };

  const { values, handleChange, handleSubmit, errors } = useForm(
    initialValues,
    loginSubmit,
    validate
  );

  function loginSubmit() {
    dispatch(login(values.email, values.password));
  }

  return (
    <form className="w-100 d-block" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          className={`form-control ${errors.email && "is-invalid"}`}
          name="email"
          type="email"
          onChange={handleChange}
          value={values.email}
          aria-describedby="email"
          autoComplete="username email"
          required
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          className={`form-control ${errors.email && "is-invalid"}`}
          name="password"
          type="password"
          onChange={handleChange}
          value={values.password}
          aria-describedby="password"
          autoComplete="current-password"
          required
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
