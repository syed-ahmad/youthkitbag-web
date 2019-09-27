import React from "react";
import useForm from "../hooks/useForm";
import { reset } from "../../actions/AuthActions";
import validate from "./ResetFormValidationRules";
import { useDispatch } from "react-redux";

const ResetForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: ""
  };

  const { values, handleChange, handleSubmit, errors } = useForm(
    initialValues,
    resetSubmit,
    validate
  );

  function resetSubmit() {
    dispatch(reset(values.email));
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
      <button className="btn btn-primary" type="submit">
        Reset Password
      </button>
    </form>
  );
};

export default ResetForm;
