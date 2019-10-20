import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGroup, requestGroupLeave } from '../../actions/GroupActions';
import Modal from '../includes/Modal';
import history from '../../helpers/history';

class GroupMemberLeave extends React.Component {
  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId);
  }

  renderTitle() {
    if (!this.props.group) {
      return 'Request to leave group';
    }
    return `Request to leave "${this.props.group.name}"`;
  }

  renderContent() {
    if (!this.props.group) {
      return 'Leave option not available at the moment.';
    }
    return `Do you want to send a request to leave "${this.props.group.name}"?`;
  }

  renderActions() {
    const { groupId } = this.props.match.params;
    return (
      <React.Fragment>
        <Link
          to={`/settings/groups/${groupId}`}
          className="btn btn-outline-secondary"
          data-dismiss="modal"
        >
          Cancel
        </Link>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => this.props.requestGroupLeave(groupId)}
        >
          Request to Leave
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
        onDismiss={() =>
          history.push(`/settings/groups/${this.props.match.params.groupId}`)
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return { group: state.group.current };
};

export default connect(
  mapStateToProps,
  { fetchGroup, requestGroupLeave }
)(GroupMemberLeave);
