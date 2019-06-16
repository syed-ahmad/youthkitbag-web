import React from 'react';
import { Router, Route } from 'react-router-dom';
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

import Purchase from './Purchase';

import KitBag from './kitbag/kit/KitBag';
import KitItem from './kitbag/kit/KitItem';
import ForSaleBag from './kitbag/forsale/ForSaleBag';
//import ForSaleItem from './kitbag/forsale/ForSaleItem';
import WantedBag from './kitbag/wanted/WantedBag';
//import WantedItem from './kitbag/wanted/WantedItem';

class App extends React.Component {

  render() {
    return (
      <div className="react-body">
        <Router history={history}>
          <User />
          <Header />
          <main>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <a id="main-acc-jump" className="sr-only sr-only-focusable" href="#footer-acc-jump">
              <div className="container">
                <span className="skiplink-text">Skip to footer content</span>
              </div>
            </a>
            <Route path="/" exact component={Home} />
            <Route path="/features" exact component={Features} />
            <Route path="/pricing" exact component={Pricing} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/login" exact component={Login} />
            <Route path="/reset" exact component={Reset} />
            <Route path="/newpassword" exact component={NewPassword} />
            <Route path="/purchase" exact component={Purchase} />
            <Route path="/kitbag/kit/all" exact component={KitBag} />
            <Route path="/kitbag/kit/add" exact component={KitItem} />
            <Route path="/kitbag/kit/edit" component={KitItem} />
            <Route path="/kitbag/forsale/all" exact component={ForSaleBag} />
            <Route path="/kitbag/wanted/all" exact component={WantedBag} />
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;