import React from 'react';
import { Link } from 'react-router-dom';

class MarketTradeCard extends React.Component {

  totalQuantity = () => {
    return 0;
  }

  topImage = () => {
    if (!this.props.trade.images) {
      return '/images/default.png';
    }
    return this.props.trade.images.length > 0 ? this.props.trade.images[0].imageUrl : '/images/default.png'
  };

  render() {
    const { _id, title, subtitle } = this.props.trade;

    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3">
        <article className="card card-link card-b1">
          <span className="icons-top-left">
            <Link to={ `/kitbag/trades/delete/${ _id }` }><span className="icon-tray-item fas fa-trash-alt"></span></Link>
          </span>
          <span className="badge badge-pill badge-dark badge-fullsize badge-top-right">{ this.totalQuantity() }</span>
          <Link to={ `/kitbag/trades/edit/${ _id }` }>
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

export default MarketTradeCard;
