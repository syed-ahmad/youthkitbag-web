import React from 'react';
import { connect } from 'react-redux';
import { fetchKitbagKits } from '../../../actions';
import { Link } from 'react-router-dom';

import Title from '../../includes/Title';
import KitCard from './KitCard';
import Search from '../../includes/Search';
import Pagination from '../../includes/Pagination';

class Kitbag extends React.Component {

  getTitle = () => {
    if (!this.props.pagination) {
      return 'Loading ...';
    }
    return `Found items in kitbag (${this.props.pagination.totalItems})`;
  }

  componentDidMount() {
    this.props.fetchKitbagKits();
    console.log('Rendering');
  }

  renderList() {
    return this.props.items.map(item => {
      return <KitCard key={item._id} kit={item}/>
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
                <Search />
              </div>
              <div className="col-12 col-sm-3 mb-3 d-flex justify-content-end">
                <Link to="/kitbag/kit/add" className="btn btn-primary">Add new kit</Link>
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
  return { items: Object.values(state.kitbag.kits), filter: state.filter, pagination: state.pagination };
}

export default connect(mapStateToProps, { fetchKitbagKits })(Kitbag);