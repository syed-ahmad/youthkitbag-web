import React from 'react';
import ForSaleCard from './ForSaleCard';

const ForSaleList = props => {
  const forsales = props.forsales.map((forsale) => {
      return <ForSaleCard key={forsale._id} forsale={forsale}/>
    });

  return (
    <div className="row">
      {forsales}
    </div>
  );
}

export default ForSaleList;