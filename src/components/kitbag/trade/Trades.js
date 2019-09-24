import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchKitbagTrades } from '../../../actions';
import queryString from 'query-string';

import Title from '../../includes/Title';
import TradeCard from './TradeCard';
import SearchForm from '../../includes/SearchForm';
import Pagination from '../../includes/Pagination';
import Alert from '../../includes/Alert';

class Trades extends React.Component {

  getTitle = () => {
    if (!this.props.pagination) {
      return 'Loading ...';
    }
    return `Your kit for trade (${this.props.pagination.totalItems})`;
  }

  componentDidMount() {
    var by = '';
    var search = '';
    var page = '';
    if (this.props.location.search) {
      const values = queryString.parse(this.props.location.search);
      search = values.search ? values.search : '';
      by = values.by ? values.by : '';
      page = values.page ? values.page : '';
    }

    this.props.fetchKitbagTrades(search, by, page, 24);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const values = queryString.parse(this.props.location.search);
      const search = values.search ? values.search : '';
      const by = values.by ? values.by : '';
      const page = values.page ? values.page : '';
      this.props.fetchKitbagTrades(search, by, page, 24);
    }
  } 

  renderList() {
    return this.props.items.map((item, index) => {
      return <TradeCard key={`${item._id}-${index}`} trade={item}/>
    })
  }

  render() {
    return (
      <div>
        <Title title={this.getTitle()} />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <Alert />
            <div className="row">
              <div className="col-12 col-sm-9">
                <SearchForm search={this.props.location.search} callback={fetchKitbagTrades} />
              </div>
              <div className="col-12 col-sm-3 mb-3 d-flex justify-content-end">
                <Link to="/kitbag/trades/new" className="btn btn-primary">Add new trade</Link>
              </div>
            </div>
            <div className="row">
            {this.renderList()}
            </div>
            <Pagination />
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { items: Object.values(state.kitbag.trade.list), filter: state.filter, pagination: state.pagination };
}

export default connect(mapStateToProps, { fetchKitbagTrades })(Trades);