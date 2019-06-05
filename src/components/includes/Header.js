import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header>
        <a id="header-acc-jump" className="sr-only sr-only-focusable" href="#main-acc-jump">
          <div className="container">
            <span className="skiplink-text">Skip to content</span>
          </div>
        </a>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="primary navigation">
          <div className="container-fluid">
            <a className="navbar-brand mr-6" href="/"><span className="fas fa-suitcase mr-3" aria-hidden="true"></span>YouthKitbag</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown mr-3">
                  <a className="nav-item nav-link dropdown-toggle" href="/whydropdown" id="whyDropdown" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">Why?</a>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="whyDropdown">
                    <a className="dropdown-item" href="/features">Features</a>
                    <hr />
                    <a className="dropdown-item" href="/features/inventory">Inventory</a>
                    <a className="dropdown-item" href="/features/security">Security</a>
                  </div>
                </li>
                <li className="nav-item">
                  <a href="/pricing" className="nav-link">Pricing</a>
                </li>
                <li className="nav-item dropdown mr-3">
                  <a className="nav-item nav-link dropdown-toggle" href="/marketdropdown" id="marketDropdown" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">Market</a>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="marketDropdown">
                    <a className="dropdown-item" href="/market/forsale/all">For Sale</a>
                    <a className="dropdown-item" href="/market/wanted/all">Wanted</a>
                    <a className="dropdown-item" href="/market/stolen/all">Stolen</a>
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown mr-3">
                  <a className="nav-item nav-link dropdown-toggle" href="/kitbagdropdown" id="kitbagDropdown" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">Kitbag</a>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="kitbagDropdown">
                    <a className="dropdown-item" href="/kitbag/kit/all">View Kitbag</a>
                    <a className="dropdown-item " href="/kitbag/kit/add">Add Kit</a>
                    <hr />
                    <a className="dropdown-item" href="/kitbag/forsale/all">Selling</a>
                    <a className="dropdown-item" href="/kitbag/wanted/all">Want</a>
                    <a className="dropdown-item" href="/kitbag/recycle/all">Recycle</a>
                    <a className="dropdown-item" href="/kitbag/donate/all">Donate</a>
                  </div>
                </li>
                <li className="nav-item">
                  <a href="/account/package" className="nav-link"><i className="fas fa-"></i></a>
                </li>
                <li className="nav-item">
                  <a href="/account/notifications" className="nav-link"><i className="fas fa-bell"></i></a>
                </li>
                <li className="nav-item dropdown mr-3">
                  <a className="nav-item nav-link dropdown-toggle" href="/accountdropdown" id="accountDropdown" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">User Name</a>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="accountDropdown">
                    <a className="dropdown-item" href="/account/profile">Account Profile</a>
                    <hr />
                    <form id="logout" action="/logout" method="POST">
                      <input type="hidden" name="_csrf" value="" />
                      <a className="dropdown-item" href="/">Logout</a>
                    </form>
                  </div>
                </li>
                <li className="nav-item ml-3">
                  <a className="btn btn-success text-nowrap" href="/login" aria-label="Login to use personalised features"><span className="fas fa-sign-in-alt" aria-hidden="true"></span> Login</a>
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

