import React from 'react';

import Title from './includes/Title';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Title title="Welcome to YouthKitbag" />
        <h1>
          <i className="fas fa-trash-alt    "></i>
          <i className="fas fa-star    "></i>
          <i className="fas fa-undo    "></i>
          <i className="fas fa-check-circle    "></i>
          <i className="fas fa-times-circle    "></i>
          <i className="fas fa-question-circle    "></i>
          <i className="fas fa-meh    "></i>
          <i className="fas fa-laugh    "></i>
          <i className="fas fa-sad-tear    "></i>
          <i className="fas fa-meh-blank    "></i>
          <i className="fas fa-home    "></i>
          <i className="fas fa-envelope    "></i>
          <i className="fas fa-phone    "></i>
          <i className="fas fa-suitcase    "></i>
          <i className="fas fa-sign-in-alt    "></i>
          <i className="fas fa-sign-out-alt    "></i>
          <i className="fas fa-coffee    "></i>
          <i className="fas fa-beer    "></i>
          <i className="fas fa-cocktail    "></i>
          <i className="fas fa-users    "></i>
        </h1>
      </div>
    );
  }
}

export default Home;
