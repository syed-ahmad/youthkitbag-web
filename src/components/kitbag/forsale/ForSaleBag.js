import React from 'react';
import { connect } from 'react-redux';
import { fetchKitbagForSales } from '../../../actions'

import Title from '../../includes/Title';
import ForSaleSearch from './ForSaleSearch';
import ForSaleList from './ForSaleList';
import Pagination from '../../includes/Pagination';

class ForSaleBag extends React.Component {

  getTitle = () => {
    if (!this.props.pagination) {
      return 'Loading ...';
    }
    return `Found items for sale (${this.props.pagination.totalItems})`;
  }

  componentDidMount() {
    this.props.fetchKitbagForSales();
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
                <ForSaleSearch filter={this.props.filter} />
              </div>
              <div className="col-12 col-sm-3 mb-3 d-flex justify-content-end">
                <a href="/forsalebag/forsale/add" className="btn btn-primary">Add new forsale</a>
              </div>
            </div>
            <ForSaleList forsales={this.props.forsales} />
            <Pagination pagination={this.props.pagination} />
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { filter: state.kitbagForSales.filter, forsales: state.kitbagForSales.forsales, pagination: state.kitbagForSales.pagination };
}

export default connect(mapStateToProps, { fetchKitbagForSales })(ForSaleBag);