import React from 'react';
import { connect } from 'react-redux';
import { fetchKitbagKits } from '../../../actions';
import { Link } from 'react-router-dom';

import Title from '../../includes/Title';
import KitSearch from './KitSearch';
import KitCard from './KitCard';
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
  }

  renderList() {
    return this.props.items.map(item => {
      if (!item._id) {
        return null
      }
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
                {/* <KitSearch /> */}
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
  return { items: Object.values(state.kitbag.kits), filter: state.kitbag.kits.filter, pagination: state.kitbag.kits.pagination };
}

export default connect(mapStateToProps, { fetchKitbagKits })(Kitbag);