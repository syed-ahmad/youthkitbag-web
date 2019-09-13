import React, { useState, useEffect } from 'react';

const DateInput = ({ value, label, field, setChange }) => {
  
  const getDate = (value) => {
    if(!value) {
      const today = new Date();
      return { day: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear()};
    }
    const date = value.split('T')[0].split('-');
    return { day: date[2], month: date[1], year: date[0] };
  }
  
  const [ actualDate, setDate ] = useState(getDate(value));
  
  const handleDayChange = (event) => {
    updateDate({...actualDate, day: event.target.value });
  }

  const handleMonthChange = (event) => {
    updateDate({...actualDate, month: event.target.value });
  }

  const handleYearChange = (event) => {
    updateDate({...actualDate, year: event.target.value });
  }

  const updateDate = (newDate) => {
    setChange(field, `${newDate.year}-${newDate.month}-${newDate.day}T00:00:00.000Z`);
  }

  useEffect(() => {
    console.log('=>', value);
    if (value) {
      setDate(getDate(value));
    }
  }, [value, setDate])

  return (
      <div className="form-group row mb-0">
        <div className="col-2">
          <label className="sr-only" htmlFor={`${field}-day`}>{label} Day</label>
          <input className="form-control input-w2" key={`${field}-day`} id={`${field}-day`} name={`${field}-day`} 
            type="text" pattern="[0-9]*" value={actualDate.day} placeholder="Day" 
            onChange={e => handleDayChange(e)} onBlur={e => handleDayChange(e)} />
        </div>
        <div className="col-2">
          <label className="sr-only" htmlFor={`${field}-month`}>{label} Month</label>
          <input className="form-control input-w2" key={`${field}-month`} id={`${field}-month`} name={`${field}-month`} 
            type="text" pattern="[0-9]*" value={actualDate.month} placeholder="Month" 
            onChange={e => handleMonthChange(e)} onBlur={e => handleMonthChange(e)} />
        </div>
        <div className="col-3 col-xs-2">
          <label className="sr-only" htmlFor={`${field}-day`}>{label} Year</label>
          <input className="form-control input-w4" key={`${field}-year`} id={`${field}-year`} name={`${field}-year`} 
            type="text" pattern="[0-9]*" value={actualDate.year} placeholder="Year" 
            onChange={e => handleYearChange(e)} onBlur={e => handleYearChange(e)} />
        </div>
      </div>
  );
}

export default DateInput;

