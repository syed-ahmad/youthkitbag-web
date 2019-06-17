import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchKitBagKits } from '../../../actions/KitbagActions';

class KitSearch extends React.Component {

  renderInput(formProps) {
    return (
      <input className="form-control" {...formProps.input} {...formProps} />
    );
  }

  renderSelect(formProps) {
    return (
      <div className="input-group-prepend">
        <select className="custom-select" {...formProps.input} {...formProps}>
          <option value="all" >All</option>
          <option value="title" >Title</option>
          <option value="activity" >Activity</option>
          <option value="tag" >Tag</option>
          <option value="inactive"  >All Inactive</option>
        </select>
      </div>
    );
  }

  onSubmit = formValues => {
    const { by, search } = formValues;
    this.props.actions.fetchKitBagKits(search, by, 1, 24);
  }

  render() {
    return (
      <div className="d-inline-block">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-group mr-3">
            <div className="input-group">
              <Field name="by" component={this.renderSelect} id="by" />
              <Field name="search" component={this.renderInput} title="Email"
                type="text" 
                id="search" 
                arialabel="Search by text" />
              <div className="input-group-append">
                <button className="btn btn-outline-primary" type="submit" id="search">Search</button>
                <a href="/kitbag/kit/all" className="btn btn-outline-secondary">Clear</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ fetchKitBagKits }, dispatch)
})

KitSearch = connect(mapStateToProps, mapDispatchToProps)(KitSearch);

export default reduxForm({
  form: 'kitsearch'
})(KitSearch);