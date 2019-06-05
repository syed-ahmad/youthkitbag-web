import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header>
        <Link id="header-acc-jump" className="sr-only sr-only-focusable" to="#main-acc-jump">
          <div className="container">
            <span className="skiplink-text">Skip to content</span>
          </div>
        </Link>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="primary navigation">
          <div className="container-fluid">
            <Link className="navbar-brand mr-6" to="/"><span className="fas fa-suitcase mr-3" aria-hidden="true"></span>YouthKitbag</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown mr-3">
                  <Link className="nav-item nav-link dropdown-toggle" to="/whydropdown" id="whyDropdown" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">Why?</Link>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="whyDropdown">
                    <Link className="dropdown-item" to="/features">Features</Link>
                    <hr />
                    <Link className="dropdown-item" to="/features/inventory">Inventory</Link>
                    <Link className="dropdown-item" to="/features/security">Security</Link>
                  </div>
                </li>
                <li className="nav-item">
                  <Link to="/pricing" className="nav-link">Pricing</Link>
                </li>
                <li className="nav-item dropdown mr-3">
                  <Link className="nav-item nav-link dropdown-toggle" to="/marketdropdown" id="marketDropdown" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">Market</Link>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="marketDropdown">
                    <Link className="dropdown-item" to="/market/forsale/all">For Sale</Link>
                    <Link className="dropdown-item" to="/market/wanted/all">Wanted</Link>
                    <Link className="dropdown-item" to="/market/stolen/all">Stolen</Link>
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown mr-3">
                  <Link className="nav-item nav-link dropdown-toggle" to="/kitbagdropdown" id="kitbagDropdown" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">Kitbag</Link>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="kitbagDropdown">
                    <Link className="dropdown-item" to="/kitbag/kit/all">View Kitbag</Link>
                    <Link className="dropdown-item " to="/kitbag/kit/add">Add Kit</Link>
                    <hr />
                    <Link className="dropdown-item" to="/kitbag/forsale/all">Selling</Link>
                    <Link className="dropdown-item" to="/kitbag/wanted/all">Want</Link>
                    <Link className="dropdown-item" to="/kitbag/recycle/all">Recycle</Link>
                    <Link className="dropdown-item" to="/kitbag/donate/all">Donate</Link>
                  </div>
                </li>
                <li className="nav-item">
                  <Link to="/account/package" className="nav-link"><i className="fas fa-"></i></Link>
                </li>
                <li className="nav-item">
                  <Link to="/account/notifications" className="nav-link"><i className="fas fa-bell"></i></Link>
                </li>
                <li className="nav-item dropdown mr-3">
                  <Link className="nav-item nav-link dropdown-toggle" to="/accountdropdown" id="accountDropdown" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">User Name</Link>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="accountDropdown">
                    <Link className="dropdown-item" to="/account/profile">Account Profile</Link>
                    <hr />
                    <form id="logout" action="/logout" method="POST">
                      <input type="hidden" name="_csrf" value="" />
                      <Link className="dropdown-item" to="/">Logout</Link>
                    </form>
                  </div>
                </li>
                <li className="nav-item ml-3">
                  <Link className="btn btn-success text-nowrap" to="/login" aria-label="Login to use personalised features"><span className="fas fa-sign-in-alt" aria-hidden="true"></span> Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;

