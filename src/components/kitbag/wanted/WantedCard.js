import React from 'react';

class WantedCard extends React.Component {

  totalQuantity = () => this.props.wanted.inbag.reduce(function (x, y) { return x + y.quantity; }, 0);

  topImage = () => this.props.wanted.images.length > 0 ? this.props.wanted.images[0].imageUrl : '/images/default.png';

  getAskingPrice = () => Number(this.props.wanted.askingPrice).toFixed(2);

  render() {
    const { _id, title, subtitle } = this.props.wanted;

    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3">
        <article className="card card-link card-b1">
          <a href={ `/wantedbag/wanted/edit/${ _id }` }>
            <img className="card-img-top" src={ this.topImage() } alt={ title } role="presentation" />
            <div className="card-body">
              <h3 className="card-title h6 ellipsis">{ title }</h3>
              { subtitle && 
                <p className="card-text ellipsis">{ subtitle }</p>
              }
              <p className="card-text">Selling price: £{ this.getAskingPrice() }</p>
            </div>
          </a>
        </article>
      </div>
    )
  };
}

export default WantedCard;
