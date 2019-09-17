import React from 'react';
import SelectInput from '../controls/SelectInput';

const SelectForm = ({cols, label, value, field, handleChange, index, error, items}) => {
  return (
    <React.Fragment>
      {(cols === "3-9" &&
        <div className="form-group row">
          <label htmlFor={field} className="col-sm-3 col-form-label">{label}</label>
          <div className="col-sm-9">
            <SelectInput value={value} field={field} handleChange={handleChange} items={items} error={error} />
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default SelectForm;