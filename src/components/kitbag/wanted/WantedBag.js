import React from 'react';
import { connect } from 'react-redux';
import { fetchKitbagWanteds } from '../../../actions';

import Title from '../../includes/Title';
import WantedSearch from './WantedSearch';
import WantedList from './WantedList';
import Pagination from '../../includes/Pagination';

class WantedBag extends React.Component {

  getTitle = () => {
    if (!this.props.pagination) {
      return 'Loading ...';
    }
    return `Found items wanted (${this.props.pagination.totalItems})`;
  }

  componentDidMount() {
    this.props.fetchKitbagWanteds();
  }

  render() {
    console.log('fetchKitbagWanteds');
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
                <WantedSearch filter={this.props.filter} />
              </div>
              <div className="col-12 col-sm-3 mb-3 d-flex justify-content-end">
                <a href="/wantedbag/wanted/add" className="btn btn-primary">Add new wanted</a>
              </div>
            </div>
            <WantedList wanteds={this.props.wanteds} />
            <Pagination pagination={this.props.pagination} />
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { filter: state.kitbagWanteds.filter, wanteds: state.kitbagWanteds.wanteds, pagination: state.kitbagWanteds.pagination };

}

export default connect(mapStateToProps, { fetchKitbagWanteds })(WantedBag);