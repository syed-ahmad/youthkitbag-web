import React from "react";

import Title from "./includes/Title";

const Features = props => {
  return (
    <div>
      <Title title="Features" />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p>
                Overflowing cupboards of sports and activity equipment for your
                kids?
              </p>
              <p>
                Every parent wants to give their kids opportunities and
                adventures as they grow. Having to buy all those school
                uniforms, the sports equipment and musical instruments, to name
                just a few.
              </p>
              <p>
                No sooner have they grow into it, they grow out of it, and start
                to follow something different. Some organisations help you
                recycle the old kit, pass it on, or sell to other parents.
              </p>
              <p>
                But there is no single place where you can easily keep track of
                your kit, sell to a group, post wanted kit posters, or get
                automatically told when kit you own may be of interest to
                someone else when you're no longer needing it or if you might
                need it.
              </p>
              <p>
                Now there is! YouthKitbag. This is a parents kit tracker,
                seller, watcher - all in one - to make your life easier, and
                hopefully help you reclaim some of the money you spent on the
                kit when it's no longer needed.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
