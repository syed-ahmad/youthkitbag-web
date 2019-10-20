import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticateToken } from '../../actions/AuthActions';

class Token extends React.Component {
  componentDidMount() {
    this.props.actions.authenticateToken(this.props.match.params.token);
  }

  render() {
    return <h1 className="loading-text">Authenticating user...</h1>;
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ authenticateToken }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(Token);
