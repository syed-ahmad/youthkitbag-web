import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as KitbagKitActions from '../../../actions';
import KitForm from './KitForm';

import Title from '../../includes/Title';

class KitEdit extends React.Component {

  componentDidMount() {
    this.props.actions.fetchKitbagKit(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    var formValuesForApi = {
      ...formValues,
      activitys: this.getArray(formValues.activitys),
      tags: this.getArray(formValues.tags)
    }
    this.props.actions.editKitbagKit(this.props.match.params.id, formValuesForApi);
  }

  getArray(field) {
    if (Array.isArray(field)) {
      return field;
    }
    return field ? field.split(',') : []
  }

  render() {
    if (!this.props.kit) {
      return <div>Loading ....</div>
    }

    return (
      <div>
        <Title title={this.props.kit.title} />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <KitForm initialValues={this.props.kit} onSubmit={this.onSubmit} />
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let newKit = state.kitbag.kits[ownProps.match.params.id];
  if (state.kitbag.kits[ownProps.match.params.id])  {
    newKit = {
      ...(state.kitbag.kits[ownProps.match.params.id]),
      purchases: (state.kitbag.kits[ownProps.match.params.id]).purchases.map(p => {
        const purchase = {...p};
        purchase.ondate = p.ondate.toString().substring(0,10);
        return purchase;
      })
    };
  }
  return { kit: newKit };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(KitbagKitActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(KitEdit);
