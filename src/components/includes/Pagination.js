import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Pagination extends React.Component {
  getPaginationLink = page => {
    return `?page=${page}${this.props.pagination.filterUrl}`;
  };

  isFirstPageDisabled = () =>
    this.props.pagination.currentPage === 1 ? "disabled" : "";

  isPreviousPageDisabled = () =>
    !this.props.pagination.hasPreviousPage ? "disabled" : "";

  isNextPageDisabled = () =>
    !this.props.pagination.hasNextPage ? "disabled" : "";

  isLastPageDisabled = () =>
    this.props.pagination.lastPage === this.props.pagination.currentPage
      ? "disabled"
      : "";

  render() {
    if (!this.props.pagination || this.props.pagination.totalItems === 0) {
      return null;
    }

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${this.isFirstPageDisabled()}`}>
            <Link className="page-link" to={this.getPaginationLink(1)}>
              First
            </Link>
          </li>
          <li className={`page-item ${this.isPreviousPageDisabled()}`}>
            <Link
              className="page-link"
              to={this.getPaginationLink(this.props.pagination.previousPage)}
            >
              Previous
            </Link>
          </li>
          <li className="page-item active">
            <Link
              className="page-link"
              to={this.getPaginationLink(this.props.pagination.currentPage)}
            >
              {this.props.pagination.currentPage}
            </Link>
          </li>
          <li className={`page-item ${this.isNextPageDisabled()}`}>
            <Link
              className="page-link"
              to={this.getPaginationLink(this.props.pagination.nextPage)}
            >
              Next
            </Link>
          </li>
          <li className={`page-item ${this.isLastPageDisabled()}`}>
            <Link
              className="page-link"
              to={this.getPaginationLink(this.props.pagination.lastPage)}
            >
              Last
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return { pagination: state.pagination };
};

export default connect(mapStateToProps)(Pagination);
