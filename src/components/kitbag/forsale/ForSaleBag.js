import React from 'react';
import ykbapi from '../../../api/youthforsalebag';

import Title from '../../includes/Title';
import ForSaleSearch from './ForSaleSearch';
import ForSaleList from './ForSaleList';
import Pagination from '../../includes/Pagination';

class ForSaleBag extends React.Component {
  state = { 
    search: '', by: 'all', 
    forsales: [], 
    pagination: { currentPage: 1, hasNextPage: false, hasPreviousPage: false, incSearch: '', itemsPerPage: 24, lastPage: 1, nextPage: 2, previousPage: 0, totalItems: 0}
  };

  onSearchSubmit = async (search, by) => {
    const response = await ykbapi.get('/kitbag/forsale', {
      params: {
        search: search,
        by: by
      }
    });

    this.setState(response.data);
  }

  getTitle = () => {
    return `Found items for sale (${this.state.pagination.totalItems})`;
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
                <ForSaleSearch onSubmit={this.onSearchSubmit}/>
              </div>
              <div className="col-12 col-sm-3 mb-3 d-flex justify-content-end">
                <a href="/forsalebag/forsale/add" className="btn btn-primary">Add new forsale</a>
              </div>
            </div>
            <ForSaleList forsales={this.state.forsales} />
            <Pagination pagination={this.state.pagination} />
          </div>
        </section>
      </div>
    );
  }
}

export default ForSaleBag;