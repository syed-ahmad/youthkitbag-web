import React from 'react';
import ykbapi from '../../api/youthkitbag';

import Title from '../includes/Title';

class SignUp extends React.Component {
  state = { email: '', password: '', confirmPassword: '' };

  onFormSubmit = event => {
    event.preventDefault();
    this.onSignUpSubmit();
  }

  onSignUpSubmit = async () => {
    const response = await ykbapi.post('/auth/signup', {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    });

    console.log(response.data);
  }

  render() {
    return (
      <div>
        <Title title="Sign Up" />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <p className="lead">If you already have an account, <a href="/login">then login to access your account</a>.</p>
            <div className="row">
              <div className="col-12 col-md-3"></div>
              <div className="col-12 col-md-6 mb-3 d-flex justify-content-center">
                <form className="w-100" onSubmit={this.onFormSubmit} noValidate>
                  <div className="form-group">
                      <label htmlFor="email">Email <span aria-hidden="true" role="presentation">(*)</span></label>
                      <input type="email" className="form-control" id="email" name="email" aria-describedby="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                  </div>
                  <div className="form-group">
                      <label htmlFor="password">Password <span aria-hidden="true" role="presentation">(*)</span></label>
                      <input type="password" className="form-control" id="password" name="password" aria-describedby="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                  </div>
                  <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password <span aria-hidden="true" role="presentation">(*)</span></label>
                      <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" aria-describedby="confirmPassword" value={this.state.confirmPassword} onChange={e => this.setState({ confirmPassword: e.target.value })} />
                  </div>
                  <button className="btn btn-primary" type="submit">Sign Up</button>
                </form>
              </div>
              <div className="col-12 col-md-3"></div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default SignUp;