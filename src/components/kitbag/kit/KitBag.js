import React from 'react';
import { connect } from 'react-redux';
import { fetchKitBagKits } from '../../../actions';
import { Link } from 'react-router-dom';

import Title from '../../includes/Title';
import KitSearch from './KitSearch';
import KitList from './KitList';
import Pagination from '../../includes/Pagination';

class KitBag extends React.Component {

  getTitle = () => {
    if (!this.props.pagination) {
      return 'Loading ...';
    }
    return `Found items in kitbag (${this.props.pagination.totalItems})`;
  }

  componentDidMount() {
    this.props.fetchKitBagKits();
  }

  render() {
    return (
      <div>
        <Title title={this.getTitle()} />
        <section
          id="main"
          className="container-fluid"
          aria-label="main body of content plus related links and features">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-9">
                <KitSearch filter={this.props.filter} />
              </div>
              <div className="col-12 col-sm-3 mb-3 d-flex justify-content-end">
                <Link to="/kitbag/kit/add" className="btn btn-primary">Add new kit</Link>
              </div>
            </div>
            <KitList kits={this.props.items} />
            <Pagination pagination={this.props.pagination} />
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { kit: state.kitbag.kit.filter, items: state.kitbag.kit.items, pagination: state.kitbag.kit.pagination };
}

export default connect(mapStateToProps, { fetchKitBagKits })(KitBag);