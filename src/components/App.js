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
import Token from './auth/Token';

import PurchaseSubscriptionPage from './PurchaseSubscriptionPage';

import Groups from './group/Groups';
import GroupPage from './group/GroupPage';
import GroupStatus from './group/GroupStatus';
import GroupMembers from './group/GroupMembers';
import GroupMemberState from './group/GroupMemberState';
import GroupMemberJoin from './group/GroupMemberJoin';
import GroupMemberLeave from './group/GroupMemberLeave';

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
import AccountPage from './account/AccountPage';
import PackagePage from './account/PackagePage';
import BadgesPage from './account/BadgesPage';

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
              <Route path="/auth/token/:token" exact component={Token} />
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
                path="/market/trade/view/:tradeId"
                exact
                component={MarketTradeViewPage}
              />
              <Route path="/market/trade" component={MarketTrades} />

              <PrivateRoute
                path="/market/wanted/view/:wantedId"
                exact
                component={MarketWantedViewPage}
              />
              <Route path="/market/wanted" component={MarketWanteds} />

              <PrivateRoute
                path="/market/stolen/view/:stolenId"
                exact
                component={MarketStolenViewPage}
              />
              <Route path="/market/stolen" component={MarketStolens} />

              <PrivateRoute path="/kitbag/kit/new" component={KitPage} />
              <PrivateRoute
                path="/kitbag/kit/edit/:kitId"
                exact
                component={KitPage}
              />
              <PrivateRoute
                path="/kitbag/kit/delete/:kitId"
                exact
                component={KitDelete}
              />
              <PrivateRoute path="/kitbag/kit" component={KitBag} />

              <PrivateRoute
                path="/kitbag/trade/new"
                exact
                component={TradePage}
              />
              <PrivateRoute
                path="/kitbag/trade/add/:kitId"
                exact
                component={TradePage}
              />
              <PrivateRoute
                path="/kitbag/trade/edit/:tradeId"
                exact
                component={TradePage}
              />
              <PrivateRoute
                path="/kitbag/trade/delete/:tradeId"
                exact
                component={TradeDelete}
              />
              <PrivateRoute path="/kitbag/trade" component={Trades} />

              <PrivateRoute
                path="/kitbag/wanted/new"
                exact
                component={WantedPage}
              />
              <PrivateRoute
                path="/kitbag/wanted/add/:kitId"
                exact
                component={WantedPage}
              />
              <PrivateRoute
                path="/kitbag/wanted/edit/:wantedId"
                exact
                component={WantedPage}
              />
              <PrivateRoute
                path="/kitbag/wanted/delete/:wantedId"
                exact
                component={WantedDelete}
              />
              <PrivateRoute path="/kitbag/wanted" component={Wanteds} />

              <PrivateRoute
                path="/kitbag/stolen/new"
                exact
                component={StolenPage}
              />
              <PrivateRoute
                path="/kitbag/stolen/add/:kitId"
                exact
                component={StolenPage}
              />
              <PrivateRoute
                path="/kitbag/stolen/edit/:stolenId"
                exact
                component={StolenPage}
              />
              <PrivateRoute
                path="/kitbag/stolen/delete/:stolenId"
                exact
                component={StolenDelete}
              />
              <PrivateRoute path="/kitbag/stolen" component={Stolens} />

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
                path="/settings/groups/:groupId/join"
                exact
                component={GroupMemberJoin}
              />
              <PrivateRoute
                path="/settings/groups/:groupId/leave"
                exact
                component={GroupMemberLeave}
              />
              <PrivateRoute
                path="/settings/groups/:groupId"
                exact
                component={GroupPage}
              />
              <PrivateRoute path="/settings/groups" component={Groups} />

              <PrivateRoute
                path="/settings/account"
                exact
                component={AccountPage}
              />
              <PrivateRoute
                path="/settings/account/profile"
                exact
                component={ProfilePage}
              />
              <PrivateRoute
                path="/settings/account/package"
                exact
                component={PackagePage}
              />
              <PrivateRoute
                path="/settings/account/badges"
                exact
                component={BadgesPage}
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
