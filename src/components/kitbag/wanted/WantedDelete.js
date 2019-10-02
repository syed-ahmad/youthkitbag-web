import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchKitbagWanted,
  deleteKitbagWanted
} from '../../../actions/KitbagWantedActions';
import Modal from '../../includes/Modal';
import history from '../../../helpers/history';

class WantedDelete extends React.Component {
  componentDidMount() {
    this.props.fetchKitbagWanted(this.props.match.params.id);
  }

  renderTitle() {
    if (!this.props.wanted) {
      return 'Delete item of wanted';
    }
    return `Delete "${this.props.wanted.title}"`;
  }

  renderContent() {
    if (!this.props.wanted) {
      return 'Are you sure you want to delete this wanted?';
    }
    return `Are you sure you want to delete this wanted titled "${this.props.wanted.title}"?`;
  }

  renderActions() {
    const wantedId = this.props.match.params.wantedId;
    return (
      <React.Fragment>
        <Link
          to="/kitbag/wanted"
          className="btn btn-outline-secondary"
          data-dismiss="modal"
        >
          Cancel
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.props.deleteKitbagWanted(wantedId)}
        >
          Delete
        </button>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal
        title={this.renderTitle()}
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/kitbag/wanted')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { wanted: state.kitbag.wanted[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchKitbagWanted, deleteKitbagWanted }
)(WantedDelete);
