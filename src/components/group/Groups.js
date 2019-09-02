import React from 'react';
import { connect } from 'react-redux';
import { fetchGroups } from '../../actions';
import queryString from 'query-string';

import Title from '../includes/Title';
import GroupCard from './GroupCard';
import GroupSearchForm from './GroupSearchForm';
import Pagination from '../includes/Pagination';

class Groups extends React.Component {

  getTitle = () => {
    if (!this.props.pagination) {
      return 'Loading ...';
    }
    return `Found groups (${this.props.pagination.totalItems})`;
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

    this.props.fetchGroups(search, by, page, 24);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      console.log('GROUPS new',this.props.location.search);
      const values = queryString.parse(this.props.location.search);
      const search = values.search ? values.search : '';
      const by = values.by ? values.by : '';
      const page = values.page ? values.page : '';
      this.props.fetchGroups(search, by, page, 24);
    }
  } 

  renderList() {
    return this.props.items.map((item, index) => {
      return <GroupCard key={`${item._id}-${index}`} group={item}/>
    })
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
                <GroupSearchForm search={this.props.location.search}/>
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
  return { items: Object.values(state.group.list), filter: state.filter, pagination: state.pagination };
}

export default connect(mapStateToProps, { fetchGroups })(Groups);