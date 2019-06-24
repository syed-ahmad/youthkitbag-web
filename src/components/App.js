import React from 'react';
import { Link, Router, Route } from 'react-router-dom';
import history from '../helpers/history'

import User from './auth/User';
import Header from './includes/Header';
import Footer from './includes/Footer';

import Home from './Home';
import Features from './Features';
import Pricing from './Pricing';

import SignUp from './auth/SignUp';
import Login from './auth/Login';
import Reset from './auth/Reset';
import NewPassword from './auth/NewPassword';
import Logout from './auth/Logout';

import Purchase from './Purchase';

import KitBag from './kitbag/kit/KitBag';
import KitCreate from './kitbag/kit/KitCreate';

class App extends React.Component {

  render() {
    return (
      <div className="react-body">
        <Router history={history}>
          <User />
          <Header />
          <main>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <Link id="main-acc-jump" className="sr-only sr-only-focusable" to="#footer-acc-jump">
              <div className="container">
                <span className="skiplink-text">Skip to footer content</span>
              </div>
            </Link>
            <Route path="/" exact component={Home} />
            <Route path="/features" exact component={Features} />
            <Route path="/pricing" exact component={Pricing} />
            
            <Route path="/auth/signup" exact component={SignUp} />
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/reset" exact component={Reset} />
            <Route path="/auth/newpassword" exact component={NewPassword} />
            <Route path="/auth/logout" exact component={Logout} />

            <Route path="/purchase" exact component={Purchase} />
            <Route path="/kitbag/kits/new" exact component={KitCreate} />
            <Route path="/kitbag/kits" exact component={KitBag} />

          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;