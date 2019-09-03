import React from 'react';
import { Link, Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import PrivateRoute from '../helpers/privateRoute'
import history from '../helpers/history'

import User from './auth/User';
import Header from './includes/Header';
import Footer from './includes/Footer';

import Home from './Home';
import Features from './Features';
import Pricing from './Pricing';

import SignUp from './auth/SignUpPage';
import Login from './auth/LoginPage';
import Reset from './auth/ResetPage';
import NewPassword from './auth/NewPasswordPage';
import Logout from './auth/Logout';

import Purchase from './Purchase';

import Groups from './group/Groups';
import GroupCreatePage from './group/GroupCreatePage';
import GroupViewPage from './group/GroupViewPage';

import KitBag from './kitbag/kit/KitBag';
import KitCreatePage from './kitbag/kit/KitCreatePage';
import KitEditPage from './kitbag/kit/KitEditPage';
import KitDelete from './kitbag/kit/KitDelete';

import Trades from './kitbag/trade/Trades';
import TradeCreatePage from './kitbag/trade/TradeCreatePage';
import TradeEditPage from './kitbag/trade/TradeEditPage';
import TradeDelete from './kitbag/trade/TradeDelete';

import Wanteds from './kitbag/wanted/Wanteds';
import WantedCreatePage from './kitbag/wanted/WantedCreatePage';
import WantedEditPage from './kitbag/wanted/WantedEditPage';
import WantedDelete from './kitbag/wanted/WantedDelete';

import Stolens from './kitbag/stolen/Stolens';
import StolenCreatePage from './kitbag/stolen/StolenCreatePage';
import StolenEditPage from './kitbag/stolen/StolenEditPage';
import StolenDelete from './kitbag/stolen/StolenDelete';

import MarketTrades from './market/trade/MarketTrades';
import MarketTradeEditPage from './market/trade/MarketTradeEditPage';

import MarketWanteds from './market/wanted/MarketWanteds';
import MarketWantedEditPage from './market/wanted/MarketWantedEditPage';

import MarketStolens from './market/stolen/MarketStolens';
import MarketStolenEditPage from './market/stolen/MarketStolenEditPage';

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
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/features" exact component={Features} />
              <Route path="/pricing" exact component={Pricing} />
              <Route path="/auth/signup" exact component={SignUp} />
              <Route path="/auth/login" exact component={Login} />
              <Route path="/auth/reset" exact component={Reset} />
              <Route path="/auth/newpassword/:key" exact component={NewPassword} />
              <Route path="/auth/logout" exact component={Logout} />
              <Route path="/market/trades" component={MarketTrades} />
              <Route path="/market/wanteds" component={MarketWanteds} />
              <Route path="/market/stolens" component={MarketStolens} />
              <PrivateRoute path="/purchase" exact component={Purchase} />
              <PrivateRoute path="/kitbag/kits/new" exact component={KitCreatePage} />
              <PrivateRoute path="/kitbag/kits/edit/:id" exact component={KitEditPage} />
              <PrivateRoute path="/kitbag/kits/delete/:id" exact component={KitDelete} />
              <PrivateRoute path="/kitbag/kits" component={KitBag} />
              <PrivateRoute path="/kitbag/trades/add/:id" exact component={TradeCreatePage} />
              <PrivateRoute path="/kitbag/trades/edit/:id" exact component={TradeEditPage} />
              <PrivateRoute path="/kitbag/trades/delete/:id" exact component={TradeDelete} />
              <PrivateRoute path="/kitbag/trades" component={Trades} />
              <PrivateRoute path="/kitbag/stolens/add/:id" exact component={StolenCreatePage} />
              <PrivateRoute path="/kitbag/stolens/edit/:id" exact component={StolenEditPage} />
              <PrivateRoute path="/kitbag/stolens/delete/:id" exact component={StolenDelete} />
              <PrivateRoute path="/kitbag/stolens" component={Stolens} />
              <PrivateRoute path="/kitbag/wanteds/add/:id" exact component={WantedCreatePage} />
              <PrivateRoute path="/kitbag/wanteds/edit/:id" exact component={WantedEditPage} />
              <PrivateRoute path="/kitbag/wanteds/delete/:id" exact component={WantedDelete} />
              <PrivateRoute path="/kitbag/wanteds" component={Wanteds} />
              <PrivateRoute path="/market/trades/view/:id" exact component={MarketTradeEditPage} />
              <PrivateRoute path="/market/wanteds/view/:id" exact component={MarketWantedEditPage} />
              <PrivateRoute path="/market/stolens/view/:id" exact component={MarketStolenEditPage} />
              <PrivateRoute path="/settings/groups/view/:id" exact component={GroupViewPage} />
              <PrivateRoute path="/settings/groups/new" exact component={GroupCreatePage} />
              <PrivateRoute path="/settings/groups" component={Groups} />
            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth })

export default connect(mapStateToProps)(App);