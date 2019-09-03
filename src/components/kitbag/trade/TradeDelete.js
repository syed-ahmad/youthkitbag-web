import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchKitbagTrade, deleteKitbagTrade } from '../../../actions/KitbagTradeActions'
import Modal from '../../includes/Modal';
import history from '../../../helpers/history';

class TradeDelete extends React.Component {
  componentDidMount() {
    this.props.fetchKitbagTrade(this.props.match.params.id);
  }

  renderTitle() {
    if (!this.props.trade) {
      return 'Delete item of trade';
    }
    return `Delete "${this.props.trade.title}"`;
  }

  renderContent() {
    if (!this.props.trade) {
      return 'Are you sure you want to delete this trade?';
    }
    return `Are you sure you want to delete this trade titled "${this.props.trade.title}"?`;
  }

  renderActions() {
    const tradeId = this.props.match.params.id;
    return (
      <React.Fragment>
        <Link to="/kitbag/trades" className="btn btn-outline-secondary" data-dismiss="modal">Cancel</Link>
        <button type="button" className="btn btn-danger" onClick={() => this.props.deleteKitbagTrade(tradeId)}>Delete</button>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal 
        title={this.renderTitle()}
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/kitbag/trades')} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { trade: state.kitbag.trade[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchKitbagTrade, deleteKitbagTrade })(TradeDelete);