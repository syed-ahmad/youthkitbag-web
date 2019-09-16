import React from 'react';

const TextInput = ({ value, field, handleChange, error }) => {
  
  return (
    <React.Fragment>
      <input className={`form-control ${error && 'is-invalid'}`} name={field} type="text" onChange={handleChange} onBlur={handleChange} value={value} aria-describedby={field} />
      {error && (
        <div className="invalid-feedback">{error}</div>
      )}
    </React.Fragment>
  );
}

export default TextInput;
