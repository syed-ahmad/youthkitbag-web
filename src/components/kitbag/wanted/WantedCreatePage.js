import React from 'react';
import WantedForm from './WantedForm';
import Title from '../../includes/Title';

const WantedCreatePage = () => {

  return (
    <div>
      <Title title="Create new wanted" />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <WantedForm />
        </div>
      </section>
    </div>
  );

}

export default WantedCreatePage;
