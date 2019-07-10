
import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchKitbagKits } from '../../actions/KitbagKitActions';

class Search extends React.Component {

  renderInput(formProps) {
    return (
      <input className="form-control" {...formProps.input} {...formProps} />
    );
  }

  renderSelect = (formProps) => {
    return (
      <div className="input-group-prepend">
        <select className="custom-select" {...formProps.input}>
          {this.props.filter.options.map(o => (<option key={o.key} value={o.key}>{o.value}</option>))}
        </select>
      </div>
    );
  }

  onSubmit = formValues => {
    const { by, search } = formValues;
    this.props.actions.fetchKitbagKits(search, by, 1, this.props.pagination.itemsPerPage);
  }

  render() {
    return (
      <div className="d-inline-block">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-group mr-3">
            <div className="input-group">
              <Field name="by" component={this.renderSelect} id="by" />
              <Field name="search" component={this.renderInput} title="search" type="text" id="search" arialabel="Search by text" />
              <div className="input-group-append">
                <button className="btn btn-outline-primary" type="submit" id="search">Search</button>
                <Link to="/kitbag/kits" className="btn btn-outline-secondary">Clear</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { filter: state.filter, pagination: state.pagination };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ fetchKitbagKits }, dispatch)
})

Search = connect(mapStateToProps, mapDispatchToProps)(Search);

export default reduxForm({
  form: 'search'
})(Search);