import React from 'react';
import { Link } from 'react-router-dom';

class KitCard extends React.Component {

  totalQuantity = () => {
    if (!this.props.kit.inbag) {
      return 0;
    }
    return this.props.kit.inbag.reduce(function (x, y) { return x + y.quantity; }, 0);
  }

  topImage = () => {
    console.log(this.props.kit);
    if (!this.props.kit.images) {
      return '/images/default.png';
    }
    return this.props.kit.images.length > 0 ? this.props.kit.images[0].imageUrl : '/images/default.png'
  };

  render() {
    const { _id, title, subtitle } = this.props.kit;

    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3">
        <article className="card card-link card-b1">
          <span className="icons-top-left">
            <Link to={ `/kitbag/kits/delete/${ _id }` }><span className="icon-tray-item fas fa-trash-alt"></span></Link>
            {/* <span className="icon-tray-item fas fa-edit"></span> */}
          </span>
          <span className="badge badge-pill badge-dark badge-fullsize badge-top-right">{ this.totalQuantity() }</span>
          <Link to={ `/kitbag/kits/edit/${ _id }` }>
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

export default KitCard;
