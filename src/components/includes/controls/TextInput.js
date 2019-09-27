import React from 'react';

const TextInput = ({
  type,
  value,
  field,
  step,
  min,
  max,
  readOnly,
  handleChange,
  error
}) => {
  return (
    <React.Fragment>
      <input
        className={`form-control ${error && 'is-invalid'}`}
        name={field}
        type={type ? type : 'text'}
        step={step}
        min={min}
        max={max}
        readOnly={readOnly}
        onChange={handleChange}
        onBlur={handleChange}
        value={value}
        aria-describedby={field}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </React.Fragment>
  );
};

export default TextInput;
