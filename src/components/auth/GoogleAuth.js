import React from 'react';
import { connect } from 'react-redux';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '438413915972-ttm2n09kdi1r15tpqm85ndqauavc1hgh.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      const userProfile = this.auth.currentUser.get().getBasicProfile();
      this.props.signIn(
        userProfile.getId(),
        userProfile.getGivenName(),
        userProfile.getEmail()
      );
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="btn btn-danger" onClick={this.onSignOutClick}>
          Sign out from Google authentication ({this.props.givenName})
        </button>
      );
    } else {
      return (
        <button className="btn btn-success" onClick={this.onSignInClick}>
          Sign in with Google authentication
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn, givenName: state.auth.givenName };
};

export default connect(
  mapStateToProps,
  null
)(GoogleAuth);
