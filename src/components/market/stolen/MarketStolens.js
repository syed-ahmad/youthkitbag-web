import React from 'react';
import { connect } from 'react-redux';
import { fetchMarketStolens } from '../../../actions';
import queryString from 'query-string';

import Title from '../../includes/Title';
import MarketStolenCard from './MarketStolenCard';
import SearchForm from '../../includes/SearchForm';
import Pagination from '../../includes/Pagination';

class MarketStolens extends React.Component {

  getTitle = () => {
    if (!this.props.pagination) {
      return 'Loading ...';
    }
    return `Stolen kit (${this.props.pagination.totalItems})`;
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

    this.props.fetchMarketStolens(search, by, page, 24);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const values = queryString.parse(this.props.location.search);
      const search = values.search ? values.search : '';
      const by = values.by ? values.by : '';
      const page = values.page ? values.page : '';
      this.props.fetchMarketStolens(search, by, page, 24);
    }
  } 

  renderList() {
    return this.props.items.map((item, index) => {
      return <MarketStolenCard key={`${item._id}-${index}`} stolen={item}/>
    })
  }

  render() {
    return (
      <div>
        <Title title={this.getTitle()} />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-9">
                <SearchForm search={this.props.location.search} callback={fetchMarketStolens} />
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
  return { items: Object.values(state.market.stolen.list), filter: state.filter, pagination: state.pagination };
}

export default connect(mapStateToProps, { fetchMarketStolens })(MarketStolens);