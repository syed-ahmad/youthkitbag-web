import React from 'react';

import Title from './includes/Title';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Title title="Welcome to YouthKitbag" />
        <section
          id="main"
          className="container-fluid"
          aria-label="main body of content plus related links and features"
        >
          <div className="container">
            <h2>Icons being used</h2>
            <i className="ykb-fa fas fa-trash-alt"></i>
            <i className="ykb-fa fas fa-star"></i>
            <i className="ykb-fa fas fa-undo"></i>
            <i className="ykb-fa fas fa-check-circle"></i>
            <i className="ykb-fa fas fa-times-circle"></i>
            <i className="ykb-fa fas fa-question-circle"></i>
            <i className="ykb-fa fas fa-meh"></i>
            <i className="ykb-fa fas fa-laugh"></i>
            <i className="ykb-fa fas fa-sad-tear"></i>
            <i className="ykb-fa fas fa-meh-blank"></i>
            <i className="ykb-fa fas fa-home"></i>
            <i className="ykb-fa fas fa-envelope"></i>
            <i className="ykb-fa fas fa-phone"></i>
            <i className="ykb-fa fas fa-suitcase"></i>
            <i className="ykb-fa fas fa-sign-in-alt"></i>
            <i className="ykb-fa fas fa-sign-out-alt"></i>
            <i className="ykb-fa fas fa-coffee"></i>
            <i className="ykb-fa fas fa-beer"></i>
            <i className="ykb-fa fas fa-cocktail"></i>
            <i className="ykb-fa fas fa-user"></i>
            <i className="ykb-fa fas fa-user-shield"></i>
            <i className="ykb-fa fas fa-user-times"></i>
            <i className="ykb-fa fas fa-user-slash"></i>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
