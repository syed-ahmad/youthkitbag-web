import React from 'react';
import KitForm from './KitForm';
import Title from '../../includes/Title';

const KitCreatePage = () => {

  return (
    <div>
      <Title title="Create new kit" />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <KitForm />
        </div>
      </section>
    </div>
  );

}

export default KitCreatePage;

