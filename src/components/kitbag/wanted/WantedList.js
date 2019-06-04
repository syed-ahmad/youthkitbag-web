import React from 'react';
import WantedCard from './WantedCard';

const WantedList = props => {
  const wanteds = props.wanteds.map((wanted) => {
      return <WantedCard key={wanted._id} wanted={wanted}/>
    });

  return (
    <div className="row">
      {wanteds}
    </div>
  );
}

export default WantedList;