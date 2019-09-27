import React from 'react';
import { Link, Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from '../helpers/privateRoute';
import history from '../helpers/history';

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

import PurchaseSubscriptionPage from './PurchaseSubscriptionPage';

import Groups from './group/Groups';
import GroupPage from './group/GroupPage';
import GroupStatus from './group/GroupStatus';
import GroupMembers from './group/GroupMembers';
import GroupMemberState from './group/GroupMemberState';

import ProfilePage from './account/ProfilePage';

import KitBag from './kitbag/kit/KitBag';
import KitPage from './kitbag/kit/KitPage';
import KitDelete from './kitbag/kit/KitDelete';

import Trades from './kitbag/trade/Trades';
import TradePage from './kitbag/trade/TradePage';
import TradeDelete from './kitbag/trade/TradeDelete';

import Wanteds from './kitbag/wanted/Wanteds';
import WantedPage from './kitbag/wanted/WantedPage';
import WantedDelete from './kitbag/wanted/WantedDelete';

import Stolens from './kitbag/stolen/Stolens';
import StolenPage from './kitbag/stolen/StolenPage';
import StolenDelete from './kitbag/stolen/StolenDelete';

import MarketTrades from './market/trade/MarketTrades';
import MarketTradeViewPage from './market/trade/MarketTradeViewPage';

import MarketWanteds from './market/wanted/MarketWanteds';
import MarketWantedViewPage from './market/wanted/MarketWantedViewPage';

import MarketStolens from './market/stolen/MarketStolens';
import MarketStolenViewPage from './market/stolen/MarketStolenViewPage';

class App extends React.Component {
  render() {
    return (
      <div className="react-body">
        <Router history={history}>
          <User />
          <Header />
          <main>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <Link
              id="main-acc-jump"
              className="sr-only sr-only-focusable"
              to="#footer-acc-jump"
            >
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
              <Route
                path="/auth/newpassword/:key"
                exact
                component={NewPassword}
              />
              <Route path="/auth/logout" exact component={Logout} />

              <PrivateRoute
                path="/purchase/subscription/:subscriptionId"
                exact
                component={PurchaseSubscriptionPage}
              />

              <PrivateRoute
                path="/market/trades/view/:tradeId"
                exact
                component={MarketTradeViewPage}
              />
              <Route path="/market/trades" component={MarketTrades} />

              <PrivateRoute
                path="/market/wanteds/view/:wantedId"
                exact
                component={MarketWantedViewPage}
              />
              <Route path="/market/wanteds" component={MarketWanteds} />

              <PrivateRoute
                path="/market/stolens/view/:stolenId"
                exact
                component={MarketStolenViewPage}
              />
              <Route path="/market/stolens" component={MarketStolens} />

              <PrivateRoute path="/kitbag/kits/new" component={KitPage} />
              <PrivateRoute
                path="/kitbag/kits/edit/:kitId"
                exact
                component={KitPage}
              />
              <PrivateRoute
                path="/kitbag/kits/delete/:kitId"
                exact
                component={KitDelete}
              />
              <PrivateRoute path="/kitbag/kits" component={KitBag} />

              <PrivateRoute
                path="/kitbag/trades/new"
                exact
                component={TradePage}
              />
              <PrivateRoute
                path="/kitbag/trades/add/:kitId"
                exact
                component={TradePage}
              />
              <PrivateRoute
                path="/kitbag/trades/edit/:tradeId"
                exact
                component={TradePage}
              />
              <PrivateRoute
                path="/kitbag/trades/delete/:tradeId"
                exact
                component={TradeDelete}
              />
              <PrivateRoute path="/kitbag/trades" component={Trades} />

              <PrivateRoute
                path="/kitbag/wanteds/new"
                exact
                component={WantedPage}
              />
              <PrivateRoute
                path="/kitbag/wanteds/add/:kitId"
                exact
                component={WantedPage}
              />
              <PrivateRoute
                path="/kitbag/wanteds/edit/:wantedId"
                exact
                component={WantedPage}
              />
              <PrivateRoute
                path="/kitbag/wanteds/delete/:wantedId"
                exact
                component={WantedDelete}
              />
              <PrivateRoute path="/kitbag/wanteds" component={Wanteds} />

              <PrivateRoute
                path="/kitbag/stolens/new"
                exact
                component={StolenPage}
              />
              <PrivateRoute
                path="/kitbag/stolens/add/:kitId"
                exact
                component={StolenPage}
              />
              <PrivateRoute
                path="/kitbag/stolens/edit/:stolenId"
                exact
                component={StolenPage}
              />
              <PrivateRoute
                path="/kitbag/stolens/delete/:stolenId"
                exact
                component={StolenDelete}
              />
              <PrivateRoute path="/kitbag/stolens" component={Stolens} />

              <PrivateRoute
                path="/settings/groups/new"
                exact
                component={GroupPage}
              />
              <PrivateRoute
                path="/settings/groups/status/:groupId"
                exact
                component={GroupStatus}
              />
              <PrivateRoute
                path="/settings/groups/:groupId/members/:memberId/:state"
                exact
                component={GroupMemberState}
              />
              <PrivateRoute
                path="/settings/groups/:groupId/members"
                exact
                component={GroupMembers}
              />
              <PrivateRoute
                path="/settings/groups/:groupId"
                exact
                component={GroupPage}
              />
              <PrivateRoute path="/settings/groups" component={Groups} />

              <PrivateRoute
                path="/settings/account/profile"
                exact
                component={ProfilePage}
              />
            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(App);
