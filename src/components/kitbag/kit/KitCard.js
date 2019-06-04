import React from 'react';

class KitCard extends React.Component {

  totalQuantity = () => this.props.kit.inbag.reduce(function (x, y) { return x + y.quantity; }, 0);

  topImage = () => this.props.kit.images.length > 0 ? this.props.kit.images[0].imageUrl : '/images/default.png';

  render() {
    const { _id, title, subtitle } = this.props.kit;

    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3">
        <article className="card card-link card-b1">
          <span className="badge badge-pill badge-dark badge-fullsize badge-top-right">{ this.totalQuantity() }</span>
          <a href={ `/kitbag/kit/edit/${ _id }` }>
            <img className="card-img-top" src={ this.topImage() } alt={ title } role="presentation" />
            <div className="card-body">
              <h3 className="card-title h6 ellipsis">{ title }</h3>
              {subtitle &&
                <p className="card-text ellipsis">{ subtitle }</p>
              }
            </div>
          </a>
        </article>
      </div>
    )
  };
}

export default KitCard;
