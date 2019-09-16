import React from 'react';
import TextInput from '../controls/TextInput';

const TextForm = ({ cols, label, value, field, handleChange, index, error }) => {
  return (
    <React.Fragment>
      {(cols === '3-9') &&
          <div className="form-group row">
          <label htmlFor="{field}" className="col-sm-3 col-form-label">{label}</label>
          <div className="col-sm-9">
            <TextInput value={value} field={field} handleChange={handleChange} error={error} />
          </div>
        </div>
      }
      {(cols === 'a4') &&
        <div className="form-group col-sm-4">
        </div>
      }
    </React.Fragment>
  );
}

export default TextForm;
