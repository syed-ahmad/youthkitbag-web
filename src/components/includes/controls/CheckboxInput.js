import React from 'react';

const CheckboxInput = ({ value, field, onChange, error }) => {
  return (
    <React.Fragment>
      <input
        className="form-check-input"
        type="checkbox"
        name={field}
        onChange={onChange}
        checked={value}
        aria-describedby={field}
      />
    </React.Fragment>
  );
};

export default CheckboxInput;
