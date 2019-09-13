import React from 'react';

const DateInput = ({ value, label, field, setChange }) => {
  
  // example date received and to be sent back = 2019-02-18T00:00:00.000Z
  let datetime = value.split('T');
  let date = datetime[0].split('-');

  const handleDayChange = (event) => {
    date[2] = event.target.value;
    updateDate();
  }

  const handleMonthChange = (event) => {
    date[1] = event.target.value;
    updateDate();
  }

  const handleYearChange = (event) => {
    date[0] = event.target.value;
    updateDate();
  }

  // Date input control does not support time element change, and therefore should always pass 0 time element back
  const updateDate = () => {
    setChange(field, `${date.join('-')}T00:00:00.000Z`);
  }

  return (
    <div className="form-group row">
      <label htmlFor={field} className="col-sm-3 col-form-label">{label}</label>
      <div className="col-sm-9">
        <div className="input-group">
          <label className="sr-only" for={`${field}-day`}>{label} Day</label>
          <input className="form-control input-w2" id={`${field}-day`} name={`${field}-day`} type="text" pattern="[0-9]*" onChange={e => handleDayChange(e)} value={date[2]} placeholder="Day" />
          <label className="sr-only" for={`${field}-month`}>{label} Month</label>
          <input className="form-control input-w2" id={`${field}-month`} name={`${field}-month`} type="text" pattern="[0-9]*" onChange={e => handleMonthChange(e)} value={date[1]} placeholder="Month" />
          <label className="sr-only" for={`${field}-day`}>{label} Year</label>
          <input className="form-control input-w4" id={`${field}-year`} name={`${field}-year`} type="text" pattern="[0-9]*" onChange={e => handleYearChange(e)} value={date[0]} placeholder="Year" />
        </div>
      </div>
    </div>
  );
}

export default DateInput;