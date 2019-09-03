import React from 'react';
import GroupForm from './GroupForm';
import Title from '../includes/Title';

const GroupCreatePage = () => {

  return (
    <div>
      <Title title="Create new group" />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <GroupForm />
        </div>
      </section>
    </div>
  );

}

export default GroupCreatePage;
