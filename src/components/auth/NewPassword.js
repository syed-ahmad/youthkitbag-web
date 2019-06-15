import React from 'react';
import ykbapi from '../../helpers/api';

import Title from '../includes/Title';

class NewPassword extends React.Component {
  state = {
    email: ''
  };

  onFormSubmit = event => {
    event.preventDefault();
    this.onNewPasswordSubmit();
  }

  onNewPasswordSubmit = async() => {
    const response = await ykbapi.post('/auth/new-password', {
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    });

    console.log(response.data);
  }

  render() {
    return (
      <div>
        <Title title="Set a new password"/>
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-3"></div>
              <div className="col-12 col-md-6 mb-3 d-flex justify-content-center">
                <form className="w-100" onSubmit={this.onFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="password">Password
                      <span aria-hidden="true" role="presentation">(*)</span>
                    </label>
                    <input type="password" className="form-control" id="password" name="password" aria-describedby="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
                  </div>
                  <button className="btn btn-primary" type="submit">Update Password</button>
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

export default NewPassword;