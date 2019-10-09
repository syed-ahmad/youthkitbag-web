import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchKitbagStolens } from '../../../actions';
import queryString from 'query-string';
import Title from '../../includes/Title';
import StolenCard from './StolenCard';
import SearchForm from '../../includes/SearchForm';
import Pagination from '../../includes/Pagination';
import Alert from '../../includes/Alert';

class Stolens extends React.Component {
  getTitle() {
    return `Your stolen kit (${this.props.pagination.totalItems})`;
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

    this.props.fetchKitbagStolens(search, by, page, 24);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const values = queryString.parse(this.props.location.search);
      const search = values.search ? values.search : '';
      const by = values.by ? values.by : '';
      const page = values.page ? values.page : '';
      this.props.fetchKitbagStolens(search, by, page, 24);
    }
  }

  renderBlank() {
    return (
      <div>
        <Title title="Loading ...." />
        <section
          id="main"
          className="container-fluid"
          aria-label="main body of content plus related links and features"
        >
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-9">
                <div className="bg-light hgt-3 mb-3">&nbsp;</div>
              </div>
            </div>
            <div className="row">{this.renderBlankList()}</div>
          </div>
        </section>
      </div>
    );
  }

  renderBlankList() {
    const blankList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    return blankList.map((item, index) => {
      return <StolenCard key={`${item._id}-${index}`} stolen={item} />;
    });
  }

  renderList() {
    if (!this.props.items) return this.renderBlankList();

    let items = [...this.props.items];

    if (items.length < 12) {
      for (var i = items.length; i < 12; i++) {
        items.push({});
      }
    }

    return items.map((item, index) => {
      return <StolenCard key={`${item._id}-${index}`} stolen={item} />;
    });
  }

  render() {
    if (!this.props.items) return this.renderBlank();

    return (
      <div>
        <Title title={this.getTitle()} />
        <section
          id="main"
          className="container-fluid"
          aria-label="main body of content plus related links and features"
        >
          <div className="container">
            <Alert />
            <div className="row">
              <div className="col-12 col-sm-9">
                <SearchForm
                  search={this.props.location.search}
                  callback={fetchKitbagStolens}
                />
              </div>
              <div className="col-12 col-sm-3 mb-3 d-flex justify-content-end">
                <Link to="/kitbag/stolen/new" className="btn btn-primary">
                  Add new stolen
                </Link>
              </div>
            </div>
            <div className="row">{this.renderList()}</div>
            <Pagination />
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: Object.values(state.kitbag.stolen.list),
    filter: state.filter,
    pagination: state.pagination
  };
};

export default connect(
  mapStateToProps,
  { fetchKitbagStolens }
)(Stolens);
