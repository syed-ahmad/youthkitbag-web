import React from 'react';
import StolenForm from './StolenForm';
import Title from '../../includes/Title';

const StolenCreatePage = () => {

  return (
    <div>
      <Title title="Create new stolen" />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <StolenForm />
        </div>
      </section>
    </div>
  );

}

export default StolenCreatePage;
