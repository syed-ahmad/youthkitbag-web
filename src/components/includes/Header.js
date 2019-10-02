import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { loggedIn } = this.props.auth;
    return (
      <header>
        <Link
          id="header-acc-jump"
          className="sr-only sr-only-focusable"
          to="#main-acc-jump"
        >
          <div className="container">
            <span className="skiplink-text">Skip to content</span>
          </div>
        </Link>
        <nav
          className="navbar navbar-expand-sm navbar-dark bg-dark"
          aria-label="primary navigation"
        >
          <div className="container-fluid">
            <Link className="navbar-brand mr-6" to="/">
              <span className="fas fa-suitcase mr-3" aria-hidden="true"></span>
              YouthKitbag
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown mr-3">
                  <Link
                    className="nav-item nav-link dropdown-toggle"
                    to="/whydropdown"
                    id="whyDropdown"
                    data-toggle="dropdown"
                    data-display="static"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Why?
                  </Link>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="whyDropdown"
                  >
                    <Link className="dropdown-item" to="/features">
                      Features
                    </Link>
                    <hr />
                    <Link className="dropdown-item" to="/features/inventory">
                      Inventory
                    </Link>
                    <Link className="dropdown-item" to="/features/security">
                      Security
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <Link to="/pricing" className="nav-link">
                    Pricing
                  </Link>
                </li>
                <li className="nav-item dropdown mr-3">
                  <Link
                    className="nav-item nav-link dropdown-toggle"
                    to="/marketdropdown"
                    id="marketDropdown"
                    data-toggle="dropdown"
                    data-display="static"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Market
                  </Link>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="marketDropdown"
                  >
                    <Link className="dropdown-item" to="/market/trade">
                      Trade
                    </Link>
                    <Link className="dropdown-item" to="/market/wanted">
                      Wanted
                    </Link>
                    <Link className="dropdown-item" to="/market/stolen">
                      Stolen
                    </Link>
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                {loggedIn && (
                  <li className="nav-item dropdown mr-3">
                    <Link
                      className="nav-item nav-link dropdown-toggle"
                      to="/kitbagdropdown"
                      id="kitbagDropdown"
                      data-toggle="dropdown"
                      data-display="static"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Kitbag
                    </Link>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="kitbagDropdown"
                    >
                      <Link className="dropdown-item" to="/kitbag/kit">
                        Your kit
                      </Link>
                      <Link className="dropdown-item" to="/kitbag/kit/new">
                        Add new kit
                      </Link>
                      <hr />
                      <Link className="dropdown-item" to="/kitbag/trade">
                        Your trades
                      </Link>
                      <Link className="dropdown-item" to="/kitbag/wanted">
                        Your wanted items
                      </Link>
                      <Link className="dropdown-item" to="/kitbag/stolen">
                        Your stolen items
                      </Link>
                    </div>
                  </li>
                )}
                {loggedIn && (
                  <li className="nav-item dropdown mr-3">
                    <Link
                      className="nav-item nav-link dropdown-toggle"
                      to="/settingsdropdown"
                      id="settingsDropdown"
                      data-toggle="dropdown"
                      data-display="static"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Settings
                    </Link>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="settingsDropdown"
                    >
                      <Link className="dropdown-item" to="/settings/account">
                        Account
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="/settings/account/profile"
                      >
                        Profile
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="/settings/account/package"
                      >
                        Package
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="/settings/account/badges"
                      >
                        Badges
                      </Link>
                      <hr />
                      <Link className="dropdown-item" to="/settings/groups">
                        Groups
                      </Link>
                    </div>
                  </li>
                )}
                {!loggedIn && (
                  <li className="nav-item">
                    <Link
                      className="btn btn-success text-nowrap"
                      to="/auth/login"
                      aria-label="Login to use personalised features"
                    >
                      <span
                        className="fas fa-sign-in-alt"
                        aria-hidden="true"
                      ></span>{' '}
                      Login
                    </Link>
                  </li>
                )}
                {loggedIn && (
                  <li className="nav-item">
                    <Link
                      className="btn btn-danger text-nowrap"
                      to="/auth/logout"
                      aria-label="Logout from application"
                    >
                      <span
                        className="fas fa-sign-out-alt"
                        aria-hidden="true"
                      ></span>{' '}
                      Logout
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

// const mapDispatchToProps = dispatch = {
//   actions: {}
// };

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Header);
