import React from 'react';
import { Link } from 'react-router-dom';

class MarketStolenCard extends React.Component {

  topImage = () => {
    if (!this.props.stolen.images) {
      return '/images/default.png';
    }
    return this.props.stolen.images.length > 0 ? this.props.stolen.images[0].imageUrl : '/images/default.png'
  };

  render() {
    const { _id, title, subtitle } = this.props.stolen;

    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3">
        <article className="card card-link card-b1">
          <Link to={ `/market/stolens/view/${ _id }` }>
            <img className="card-img-top" src={ this.topImage() } alt={ title } role="presentation" />
            <div className="card-body">
              <h3 className="card-title h6 ellipsis">{ title }</h3>
              {subtitle &&
                <p className="card-text ellipsis">{ subtitle }</p>
              }
            </div>
          </Link>
        </article>
      </div>
    )
  };
}

export default MarketStolenCard;
