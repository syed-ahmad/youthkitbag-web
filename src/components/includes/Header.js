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
          className="navbar navbar-expand-sm navbar-dark purple-gradient"
          aria-label="primary navigation"
        >
          <div className="container">
            <Link className="navbar-brand mr-6 navbar-logo" to="/">
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
                    <Link className="dropdown-item" to="/why#created">
                      ... I created YouthKitbag
                    </Link>
                    {/* <hr />
                    <Link className="dropdown-item" to="/why#tryit">
                      ... you should try it
                    </Link>
                    <Link className="dropdown-item" to="/why#concern">
                      ... you might be concerned
                    </Link> */}
                  </div>
                </li>
                <li className="nav-item">
                  <Link to="/pricing" className="nav-link">
                    Pricing
                  </Link>
                </li>
                {/* <li className="nav-item dropdown mr-3">
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
                </li> */}
              </ul>
              <ul className="navbar-nav ml-auto">
                {loggedIn && (
                  <React.Fragment>
                    <li className="nav-item">
                      <Link to="/market" className="nav-link">
                        Market
                      </Link>
                    </li>
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
                        <Link className="dropdown-item" to="/kitbag/market">
                          Your market place
                        </Link>
                        {/* <Link className="dropdown-item" to="/kitbag/trade">
                        Your trades
                      </Link>
                      <Link className="dropdown-item" to="/kitbag/wanted">
                        Your wanted items
                      </Link>
                      <Link className="dropdown-item" to="/kitbag/stolen">
                        Your stolen items
                      </Link> */}
                      </div>
                    </li>

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

                    <li className="nav-item mr-3">
                      <Link
                        className="nav-link d-inline"
                        to="/settings/account"
                      >
                        <img
                          src={
                            this.props.user.profile.images &&
                            this.props.user.profile.images.length > 0
                              ? this.props.user.profile.images[0].imageUrl
                              : '/images/defaultthumb.png'
                          }
                          className="img-avatar img-thumbnail img-link rounded-circle p-0 m-1"
                          alt=""
                        />
                      </Link>
                    </li>
                  </React.Fragment>
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

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(mapStateToProps)(Header);
