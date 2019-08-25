import React from 'react';
import TradeForm from './TradeForm';
import Title from '../../includes/Title';

const TradeCreatePage = () => {

  return (
    <div>
      <Title title="Create new trade" />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <TradeForm />
        </div>
      </section>
    </div>
  );

}

export default TradeCreatePage;
