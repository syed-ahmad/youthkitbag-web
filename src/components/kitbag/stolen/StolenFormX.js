
import React, { useEffect } from 'react';
import useDate from '../../hooks/useDate';

const StolenFormX = ({ stolen }) => {
  const [StolenOnDate] = useDate();
  
  return (
    <StolenOnDate />

  );
}

export default StolenFormX;
