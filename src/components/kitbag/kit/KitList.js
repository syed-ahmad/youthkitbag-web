import React from 'react';
import KitCard from './KitCard';

const KitList = props => {
  const kits = props.kits.map((kit) => {
      return <KitCard key={kit._id} kit={kit}/>
    });

  return (
    <div className="row">
      {kits}
    </div>
  );
}

export default KitList;