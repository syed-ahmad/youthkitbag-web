import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchKitbagStolen,
  deleteKitbagStolen
} from "../../../actions/KitbagStolenActions";
import Modal from "../../includes/Modal";
import history from "../../../helpers/history";

class StolenDelete extends React.Component {
  componentDidMount() {
    this.props.fetchKitbagStolen(this.props.match.params.id);
  }

  renderTitle() {
    if (!this.props.stolen) {
      return "Delete item of stolen";
    }
    return `Delete "${this.props.stolen.title}"`;
  }

  renderContent() {
    if (!this.props.stolen) {
      return "Are you sure you want to delete this stolen?";
    }
    return `Are you sure you want to delete this stolen titled "${this.props.stolen.title}"?`;
  }

  renderActions() {
    const stolenId = this.props.match.params.id;
    return (
      <React.Fragment>
        <Link
          to="/kitbag/stolens"
          className="btn btn-outline-secondary"
          data-dismiss="modal"
        >
          Cancel
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.props.deleteKitbagStolen(stolenId)}
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
        onDismiss={() => history.push("/kitbag/stolens")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stolen: state.kitbag.stolen[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchKitbagStolen, deleteKitbagStolen }
)(StolenDelete);
