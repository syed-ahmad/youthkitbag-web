import React from 'react';
import TextAreaInput from '../controls/TextAreaInput';

const TextAreaForm = ({ colFormat, label, value, field, handleChange, index, error }) => {
  return (
    <React.Fragment>
      {(colFormat === '3-9') &&
          <div className="form-group row">
          <label htmlFor="{field}" className="col-sm-3 col-form-label">{label}</label>
          <div className="col-sm-9">
            <TextAreaInput value={value} field={field} handleChange={handleChange} error={error} />
          </div>
        </div>
      }
      {(colFormat === 'a-4') &&
        <div className="form-group col-sm-4">
        </div>
      }
    </React.Fragment>
  );
}

export {TextAreaForm};
