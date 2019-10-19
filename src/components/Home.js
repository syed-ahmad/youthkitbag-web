import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div>
        <section
          id="main"
          className="container-fluid"
          aria-label="main body of content plus related links and features"
        >
          <div className="jumbotron">
            <div className="container text-center">
              <h1>YouthKitbag</h1>
              <h2 className="pb-3">Inventory, Trade, Aquire, Report</h2>
              <h3 className="">
                for your school kit, club kit, team kit, any kit
              </h3>
              <h4 className="pb-5">
                sports gear, musical instruments, school uniforms, more
              </h4>
            </div>
          </div>
          <div className="container mb-3">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-3">
                <article className="card card-link card-b1">
                  <div className="d-flex">
                    <div className="blank-square bg-light" />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title h6 ellipsis bg-light hgt-2">
                      &nbsp;
                    </h3>
                    <p className="card-text ellipsis bg-light hgt-3">&nbsp;</p>
                  </div>
                </article>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <article className="card card-link card-b1">
                  <div className="d-flex">
                    <div className="blank-square bg-light" />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title h6 ellipsis bg-light hgt-2">
                      &nbsp;
                    </h3>
                    <p className="card-text ellipsis bg-light hgt-3">&nbsp;</p>
                  </div>
                </article>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <article className="card card-link card-b1">
                  <div className="d-flex">
                    <div className="blank-square bg-light" />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title h6 ellipsis bg-light hgt-2">
                      &nbsp;
                    </h3>
                    <p className="card-text ellipsis bg-light hgt-3">&nbsp;</p>
                  </div>
                </article>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <article className="card card-link card-b1">
                  <div className="d-flex">
                    <div className="blank-square bg-light" />
                  </div>
                  <div className="card-body">
                    <h3 className="card-title h6 ellipsis bg-light hgt-2">
                      &nbsp;
                    </h3>
                    <p className="card-text ellipsis bg-light hgt-3">&nbsp;</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
