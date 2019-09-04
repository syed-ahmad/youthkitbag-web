import React from 'react';
import { Link } from 'react-router-dom';

class GroupCard extends React.Component {

  totalQuantity = () => {
    return 0;
  }

  topImage = () => {
    if (!this.props.group.images) {
      return '/images/default.png';
    }
    return this.props.group.images.length > 0 ? this.props.group.images[0].imageUrl : '/images/default.png'
  };

  approvalIcon = (approval) => {
    switch (approval) {
      case 'approved':
        return 'fas fa-check-circle text-success';
      case 'blocked':
        return 'fas fa-times-circle text-danger';
      default:
        return 'fas fa-question-circle text-warning';
    }
  }

  render() {
    const { _id, name, activitys, approval } = this.props.group;

    return (
      <div className="col-6 col-md-4 col-lg-3 mb-3">
        <article className="card card-link card-b1">
        <span className="icons-top-left">
            <Link to={ `/settings/groups/status/${ _id }` }><span className={`icon-tray-item ${this.approvalIcon(approval)}`}></span></Link>
          </span>
          <span className={`badge badge-pill badge-dark badge-fullsize badge-top-right`}>0</span>
          <Link to={ `/settings/groups/view/${ _id }` }>
            <img className="card-img-top" src={ this.topImage() } alt={ name } role="presentation" />
            <div className="card-body">
              <h3 className="card-title h6 ellipsis">{ name }</h3>
              {activitys &&
                <p className="card-text ellipsis">{ activitys.join(', ') }</p>
              }
            </div>
          </Link>
        </article>
      </div>
    )
  };
}

export default GroupCard;
