import React from "react";
import DateInput from "../controls/DateInput";

const DateForm = ({ colFormat, label, value, field, setChange, index }) => {
  return (
    <React.Fragment>
      {colFormat === "3-9" && (
        <div className="form-group row">
          <label htmlFor={field} className="col-sm-3 col-form-label">
            {label}
          </label>
          <div className="col-sm-9">
            <DateInput value={value} field={field} setChange={setChange} />
          </div>
        </div>
      )}
      {colFormat === "a-4" && (
        <div className="form-group col-sm-4">
          {index === 0 && <label className="d-none d-sm-block">{label}</label>}
          <DateInput value={value} field={field} setChange={setChange} />
        </div>
      )}
    </React.Fragment>
  );
};

export { DateForm };
