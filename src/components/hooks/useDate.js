import React, { useState } from 'react';

const useDate = () => {
  const [datevalue, setDatevalue] = useState("2019");

  const changeValue = (e) => {
    setDatevalue(e.target.value)
  }

  const DateInput = () => (
    <input key="hsgdjhagdsjhgj" id="sjdfjhg" type="text" onChange={event => changeValue(event)} value={datevalue} />
  )

  return [DateInput];
}

export default useDate;