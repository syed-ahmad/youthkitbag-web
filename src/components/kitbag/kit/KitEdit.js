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
    console.log(formValues);
    this.props.actions.editKitbagKit(formValues);
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
  return { kit: state.kitbag.kits[ownProps.match.params.id] };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(KitbagKitActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(KitEdit);
