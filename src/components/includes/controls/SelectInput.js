import React from 'react';

const CheckboxInput = ({ value, field, handleChange, items, error }) => {
  return (
    <React.Fragment>
      <select
        className="custom-select"
        name={field}
        onChange={handleChange}
        onBlur={handleChange}
        value={value}
        aria-describedby={field}
      >
        {items.map(item => {
          const id = item.replace(' ', '').toLowerCase();
          return (
            <option key={id} value={id}>
              {item}
            </option>
          );
        })}
      </select>
    </React.Fragment>
  );
};

export default CheckboxInput;
