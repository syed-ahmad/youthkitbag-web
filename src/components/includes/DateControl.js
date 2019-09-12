import React from 'react';

const DateControl = ({ handleChange, value, label, field, setChange }) => {
  
  // 2019-02-18T00:00:00.000Z
  let datetime = value.split('T');
  let date = datetime[0].split('-');

  const handleDayChange = (event) => {
    date[2] = event.target.value;
    setChange(field, date.join('-') + 'T' + datetime[1]);
  }

  return (
    <div className="form-group row">
      <label htmlFor={field} className="col-sm-3 col-form-label">{label}</label>
      <div className="col-sm-9">
        <input className="form-control" name={field} type="text" onChange={handleChange} value={value} aria-describedby={field} />
        <input className="form-control" name="day" type="text" onChange={e => handleDayChange(e)} value={date[2]} />
        <input className="form-control" name="month" type="text" value={date[1]} />
        <input className="form-control" name="year" type="text" value={date[0]} />
      </div>
    </div>
  );
}

export default DateControl;