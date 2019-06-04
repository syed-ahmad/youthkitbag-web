import React from 'react';

class Pagination extends React.Component {

  getPaginationLink = (page) => {
    return `?page=${page}${this.props.pagination.filterUrl}`;
  }

  isFirstPageDisabled = () => this.props.pagination.currentPage === 1
    ? 'disabled'
    : '';

  isPreviousPageDisabled = () => !this.props.pagination.hasPreviousPage
    ? 'disabled'
    : '';

  isNextPageDisabled = () => !this.props.pagination.hasNextPage
    ? 'disabled'
    : '';

  isLastPageDisabled = () => this.props.pagination.lastPage === this.props.pagination.currentPage
    ? 'disabled'
    : '';

  render() {
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${this.isFirstPageDisabled()}`}>
            <a className="page-link" href={this.getPaginationLink(1)}>First</a>
          </li>
          <li className={`page-item ${this.isPreviousPageDisabled()}`}>
            <a
              className="page-link"
              href={this.getPaginationLink(this.props.pagination.previousPage)}>Previous</a>
          </li>
          <li className="page-item active">
            <a
              className="page-link"
              href={this.getPaginationLink(this.props.pagination.currentPage)}>{this.props.pagination.currentPage}</a>
          </li>
          <li className={`page-item ${this.isNextPageDisabled()}`}>
            <a
              className="page-link"
              href={this.getPaginationLink(this.props.pagination.nextPage)}>Next</a>
          </li>
          <li className={`page-item ${this.isLastPageDisabled()}`}>
            <a
              className="page-link"
              href={this.getPaginationLink(this.props.pagination.lastPage)}>Last</a>
          </li>
        </ul>
      </nav>
    )
  }
};

export default Pagination;
