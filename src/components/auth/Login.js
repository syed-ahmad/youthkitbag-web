import React from 'react';
import ykbapi from '../../api/youthkitbag';
import GoogleAuth from './GoogleAuth';

import Title from '../includes/Title';

class Login extends React.Component {
  state = { email: '', password: '' };

  onFormSubmit = event => {
    event.preventDefault();
    this.onLoginSubmit();
  }

  onLoginSubmit = async () => {
    const response = await ykbapi.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    });

    console.log(response.data);
  }

  render() {
    return (
      <div>
        <Title title="Login" />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <p className="lead">If you don't have an account already, <a href="/signup">then sign up for an account</a>. Or for the forgetful, <a href="/reset">then reset your password</a>.</p>
            <div className="row">
                <div className="col-12 col-md-6 mb-3 mx-auto">
                  <form className="w-100 d-block" onSubmit={this.onFormSubmit} noValidate>
                    <div className="form-group">
                      <label htmlFor="email">Email <span aria-hidden="true" role="presentation">(*)</span></label>
                      <input type="email" className="form-control" id="email" name="email" aria-describedby="email" autoComplete="username email" required value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                      <div className="invalid-feedback">Please enter a valid email</div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password <span aria-hidden="true" role="presentation">(*)</span></label>
                      <input type="password" className="form-control" id="password" name="password" aria-describedby="password" autoComplete="current-password" required value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                      <div className="invalid-feedback">Please enter a valid password</div>
                    </div>
                    <button className="btn btn-primary" type="submit">Login</button>
                  </form>
                </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 mb-3 mx-auto">
                <hr />
                <h2 className="h4">or authenticate with one of these services</h2>
                <GoogleAuth />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;