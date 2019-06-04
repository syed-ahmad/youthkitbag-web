import React from 'react';
import ykbapi from '../../../api/youthwantedbag';

import Title from '../../includes/Title';
import WantedSearch from './WantedSearch';
import WantedList from './WantedList';
import Pagination from '../../includes/Pagination';

class WantedBag extends React.Component {
  state = { 
    search: '', by: 'all', 
    wanteds: [], 
    pagination: { currentPage: 1, hasNextPage: false, hasPreviousPage: false, incSearch: '', itemsPerPage: 24, lastPage: 1, nextPage: 2, previousPage: 0, totalItems: 0}
  };

  onSearchSubmit = async (search, by) => {
    const response = await ykbapi.get('/kitbag/wanted', {
      params: {
        search: seartch,
        by: by
      }
    });

    this.setState(response.data);
  }

  getTitle = () => {
    return `Found items in wantedbag (${this.state.pagination.totalItems})`;
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
                <WantedSearch onSubmit={this.onSearchSubmit}/>
              </div>
              <div className="col-12 col-sm-3 mb-3 d-flex justify-content-end">
                <a href="/wantedbag/wanted/add" className="btn btn-primary">Add new wanted</a>
              </div>
            </div>
            <WantedList wanteds={this.state.wanteds} />
            <Pagination pagination={this.state.pagination} />
          </div>
        </section>
      </div>
    );
  }
}

export default WantedBag;