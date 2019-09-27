import React from 'react';
import { connect } from 'react-redux';
import { fetchGroups } from '../../actions';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import Title from '../includes/Title';
import GroupCard from './GroupCard';
import SearchForm from '../includes/SearchForm';
import Pagination from '../includes/Pagination';
import Alert from '../includes/Alert';

class Groups extends React.Component {
  getTitle = () => {
    if (!this.props.pagination) {
      return 'Loading ...';
    }
    return `Found groups (${this.props.pagination.totalItems})`;
  };

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

    this.props.fetchGroups(search, by, page, 24);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const values = queryString.parse(this.props.location.search);
      const search = values.search ? values.search : '';
      const by = values.by ? values.by : '';
      const page = values.page ? values.page : '';
      this.props.fetchGroups(search, by, page, 24);
    }
  }

  renderList() {
    return this.props.items.map((item, index) => {
      return <GroupCard key={`${item._id}-${index}`} group={item} />;
    });
  }

  render() {
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
                  callback={fetchGroups}
                />
              </div>
              <div className="col-12 col-sm-3 mb-3 d-flex justify-content-end">
                <Link to="/settings/groups/new" className="btn btn-primary">
                  Add new group
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
    items: Object.values(state.group.list),
    filter: state.filter,
    pagination: state.pagination
  };
};

export default connect(
  mapStateToProps,
  { fetchGroups }
)(Groups);
