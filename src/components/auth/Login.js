import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

import Title from '../includes/Title';

const Login = () => {
    return (
      <div>
        <Title title="Login" />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <p className="lead">If you don't have an account already, <Link to="/auth/signup">then sign up for an account</Link>. Or for the forgetful, <Link to="/auth/reset">then reset your password</Link>.</p>
            <div className="row">
              <div className="col-12 col-md-6 mb-3 mx-auto">
                {/* {this.renderAlert()} */}
                <LoginForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}

export default Login;