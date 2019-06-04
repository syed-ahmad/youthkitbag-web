import React from 'react';
import { connect } from 'react-redux';
import { fetchKitBagKits } from '../../../actions'




import Title from '../../includes/Title';
import KitSearch from './KitSearch';
import KitList from './KitList';
import Pagination from '../../includes/Pagination';

class KitBag extends React.Component {
  // state = { 
  //   search: '', by: 'all', 
  //   kits: [], 
  //   pagination: { currentPage: 1, hasNextPage: false, hasPreviousPage: false, incSearch: '', itemsPerPage: 24, lastPage: 1, nextPage: 2, previousPage: 0, totalItems: 0}
  // };



  //   this.setState(response.data);
  // }

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
    console.log(this.props);

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
                <KitSearch />
              </div>
              <div className="col-12 col-sm-3 mb-3 d-flex justify-content-end">
                <a href="/kitbag/kit/add" className="btn btn-primary">Add new kit</a>
              </div>
            </div>
            <KitList kits={this.props.kits} />
            <Pagination pagination={this.props.pagination} />
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { search: state.kitbagKits.search, by: state.kitbagKits.by, kits: state.kitbagKits.kits, pagination: state.kitbagKits.pagination };
}

export default connect(mapStateToProps, { fetchKitBagKits })(KitBag);

{/* <section
id="main"
className="container-fluid"
aria-label="main body of content plus related links and features">
<div className="container">
  <div className="row">
    <div className="col-12 col-sm-9">
      <KitSearch onSubmit={this.onSearchSubmit}/>
    </div>
    <div className="col-12 col-sm-3 mb-3 d-flex justify-content-end">
      <a href="/kitbag/kit/add" className="btn btn-primary">Add new kit</a>
    </div>
  </div>
  <KitList kits={this.state.kits} />
  <Pagination pagination={this.state.pagination} />
</div>
</section> */}