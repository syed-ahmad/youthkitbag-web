import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../../actions/UserActions';

class User extends React.Component {
  componentDidMount() {
    this.props.actions.getUser();
  }
  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getUser }, dispatch),
})

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(User)