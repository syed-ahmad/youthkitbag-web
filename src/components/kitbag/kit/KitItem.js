import React from 'react';

import Title from '../../includes/Title';

class KitItem extends React.Component {
  state = {
    kit: {
      title: 'Loading ...',
      subtitle: '',
      description: '',
      status: 0,
      security: '',
      purchases: [],
      inbag: [],
      warningLevel: null,
      activitys: [],
      tags: [],
      keptInbag: false,
      active: true,
      images: []
    },
    errors: [],
    editing: false
  };

  onFormSubmit = () => {
    console.log('form submitetd');
  }

  topImage = () => this.state.kit.images.length > 0 ? this.state.kit.images[0].imageUrl : '/images/default.png';

  render() {
    return (
      <div>
        <Title title={this.state.kit.title} />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <form onSubmit={ this.onFormSubmit }>
              <div className="row">
                <div className="col-12 col-lg-6 order-1 order-lg-2" role="main">
                  <div>
                    <img id="preview" className="img-fluid mb-3" src={ this.topImage() } alt={ this.state.kit.title } role="presentation" />
                  </div>
                </div>
                <div className="col-12 col-lg-6 order-2 order-lg-1" role="main">
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="title" name="title" aria-describedby="title" required="required" aria-required="true" value={this.state.kit.title} onChange={e => this.setState({ kit: { title: e.target.value }})} />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-12 col-lg-6" role="main">
                    <button className="btn btn-primary" type="submit">Add Kit</button>
                </div>
            </div>
        </form>
    </div>

</section>
      </div>
    );
  }
}

export default KitItem;