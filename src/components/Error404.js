import React from 'react';

import Title from './includes/Title';

const Error404 = (props) => {
  return (
    <div>
      <Title title="Error 404" />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="h3">We're very sorry, but the page you were looking for has not been found.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Error404;