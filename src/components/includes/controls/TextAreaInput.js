import React from 'react';

const TextAreaInput = ({ value, field, handleChange, error }) => {
  
  return (
    <React.Fragment>
      <textarea className={`form-control ${error && 'is-invalid'}`} name={field} rows="5" onChange={handleChange} onBlur={handleChange} value={value} aria-describedby={field}></textarea>
      {error && (
        <div className="invalid-feedback">{error}</div>
      )}
    </React.Fragment>
  );
}

export default TextAreaInput;
