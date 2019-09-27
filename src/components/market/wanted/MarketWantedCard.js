import React from "react";
import { Link } from "react-router-dom";

class MarketWantedCard extends React.Component {
  renderOfferPrice = offerPrice => {
    if (!offerPrice || offerPrice === 0) return "Free";
    return `£${offerPrice.toFixed(2)}`;
  };

  topImage = () => {
    if (!this.props.wanted.images) {
      return "/images/default.png";
    }
    return this.props.wanted.images.length > 0
      ? this.props.wanted.images[0].imageUrl
      : "/images/default.png";
  };

  render() {
    const { _id, title, subtitle, offerPrice } = this.props.wanted;

    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3">
        <article className="card card-link card-b1">
          <span className="badge badge-pill badge-dark badge-fullsize badge-top-right">
            {this.renderOfferPrice(offerPrice)}
          </span>
          <Link to={`/market/wanteds/view/${_id}`}>
            <img
              className="card-img-top"
              src={this.topImage()}
              alt={title}
              role="presentation"
            />
            <div className="card-body">
              <h3 className="card-title h6 ellipsis">{title}</h3>
              {subtitle && <p className="card-text ellipsis">{subtitle}</p>}
            </div>
          </Link>
        </article>
      </div>
    );
  }
}

export default MarketWantedCard;
