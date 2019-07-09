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

import KitBag from './kitbag/kit/KitBag';
import KitCreate from './kitbag/kit/KitCreatePage';
import KitEdit from './kitbag/kit/KitEdit';
import KitDelete from './kitbag/kit/KitDelete';

class App extends React.Component {
  componentDidMount() {
    console.log('App did mount', this.props.auth);
  }

  render() {
    console.log('Routes props', this.props.auth);
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
              <PrivateRoute path="/purchase" exact component={Purchase} auth={this.props.auth} />
              <PrivateRoute path="/kitbag/kits/new" exact component={KitCreate} auth={this.props.auth} />
              <PrivateRoute path="/kitbag/kits/edit/:id" exact component={KitEdit} auth={this.props.auth} />
              <PrivateRoute path="/kitbag/kits/delete/:id" exact component={KitDelete} auth={this.props.auth} />
              <PrivateRoute path="/kitbag/kits" component={KitBag} auth={this.props.auth} />
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