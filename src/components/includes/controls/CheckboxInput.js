import React from 'react';

const CheckboxInput = ({ value, field, handleChange, error }) => {
  
  return (
    <React.Fragment>
      <input className="form-check-input" type="checkbox" name={field} onChange={handleChange} onBlur={handleChange} checked={value} aria-describedby={field} />
    </React.Fragment>
  );
}

export default CheckboxInput;
