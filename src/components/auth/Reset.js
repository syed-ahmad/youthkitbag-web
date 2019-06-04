import React from 'react';
import ykbapi from '../../api/youthkitbag';

import Title from '../includes/Title';

class Reset extends React.Component {
  state = { email: '' };

  onFormSubmit = event => {
    event.preventDefault();
    this.onResetSubmit();
  }

  onResetSubmit = async () => {
    const response = await ykbapi.post('/auth/reset', {
      email: this.state.email
    });

    console.log(response.data);
  }

  render() {
    return (
      <div>
        <Title title="Reset your password" />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-3"></div>
              <div className="col-12 col-md-6 mb-3 d-flex justify-content-center">
                <form className="w-100" onSubmit={this.onFormSubmit} noValidate>
                  <div className="form-group">
                    <label htmlFor="email">Email <span aria-hidden="true" role="presentation">(*)</span></label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                  </div>
                  <button className="btn btn-primary" type="submit">Reset Password</button>
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

export default Reset;