import React from 'react';

class ForSaleSearch extends React.Component {
  state = { search: '', by: 'all' };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.search, this.state.by) 
  }

  render() {
    return (
        <div className="d-inline-block">
          <form onSubmit={this.onFormSubmit}>
            <div className="form-group mr-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <select className="custom-select" id="by" name="by" value={this.state.by} onChange={e => this.setState({ by: e.target.value })}>
                    <option value="all" >All for sale</option>
                    <option value="title" >Title</option>
                    <option value="activity" >Activity</option>
                    <option value="hassold"  >Sold</option>
                  </select>
                </div>
                <input type="text" className="form-control" aria-label="Search by text" id="search" name="search" value={this.state.value} onChange={e => this.setState({ search: e.target.value })} />
                <div className="input-group-append">
                  <button className="btn btn-outline-primary" type="submit" id="search">Search</button>
                  <a href="/forsalebag/forsale/all" className="btn btn-outline-secondary">Clear</a>
                </div>
              </div>
            </div>
          </form>
        </div>
    );
  }
}

export default ForSaleSearch;