import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as KitbagKitActions from '../../../actions';
import KitForm from './KitForm';

import Title from '../../includes/Title';

class KitCreate extends React.Component {

  onSubmit = (formValues) => {
    var formValuesForApi = {
      ...formValues,
      activitys: this.getArray(formValues.activitys),
      tags: this.getArray(formValues.tags)
    }
    this.props.actions.createKitbagKit(formValuesForApi);
  }

  getArray(field) {
    if (Array.isArray(field)) {
      return field;
    }
    return field ? field.split(',') : []
  }

  render() {
    return (
      <div>
        <Title title="Create new kit" />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <KitForm onSubmit={this.onSubmit} />
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { kit: state.kitbag.kits[0] };
}

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(KitbagKitActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(KitCreate);

