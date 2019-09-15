import React, { useState, useEffect } from 'react';

const DateInput = ({ value, field, setChange }) => {
  
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
    const { value } = event.target;
    if (!value) {
      return updateDate({...actualDate, day: '' });
    }
    const dd = +value;
    if (dd >= 0 && dd <= 31) {
      updateDate({...actualDate, day: value });
    }
  }

  const handleMonthChange = (event) => {
    const { value } = event.target;
    if (!value) {
      return updateDate({...actualDate, month: '' });
    }
    const mm = +value;
    if (mm >= 0 && mm <= 12) {
      updateDate({...actualDate, month: value });
    }
  }

  const handleYearChange = (event) => {
    const { value } = event.target;
    if (!value) {
      return updateDate({...actualDate, year: '' });
    }
    const yy = +value;
    if (yy >= 0 && yy <= 2025) {
      updateDate({...actualDate, year: value });
    }
  }

  const updateDate = (newDate) => {
    setChange(field, `${newDate.year}-${newDate.month}-${newDate.day}T00:00:00.000Z`);
  }

  useEffect(() => {
    if (value) {
      const newDate = getDate(value);
      setDate(newDate);
    }
  }, [value, setDate])

  return (
      <div className="input-group date-input">
        <input className="form-control group-control-left date-input-w2" key={`${field}-day`} id={`${field}-day`} name={`${field}-day`} 
          type="text" pattern="[0-9]*" value={actualDate.day} placeholder="dd" aria-label="Day" maxLength="2"
          onChange={e => handleDayChange(e)} onBlur={e => handleDayChange(e)} />
        <input className="form-control group-control-center date-input-w2" key={`${field}-month`} id={`${field}-month`} name={`${field}-month`} 
          type="text" pattern="[0-9]*" value={actualDate.month} placeholder="mm" aria-label="Month" maxLength="2"
          onChange={e => handleMonthChange(e)} onBlur={e => handleMonthChange(e)} />
        <input className="form-control group-control-right date-input-w4" key={`${field}-year`} id={`${field}-year`} name={`${field}-year`} 
          type="text" pattern="[0-9]*" value={actualDate.year} placeholder="yyyy" aria-label="Year" maxLength="4"
          onChange={e => handleYearChange(e)} onBlur={e => handleYearChange(e)} />
      </div>
  );
}

export default DateInput;

