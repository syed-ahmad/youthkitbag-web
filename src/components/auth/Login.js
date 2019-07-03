import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions';

import Title from '../includes/Title';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
  }
 
  render() {
    return (
      <div>
        <Title title="Login" />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <p className="lead">If you don't have an account already, <Link to="/auth/signup">then sign up for an account</Link>. Or for the forgetful, <Link to="/auth/reset">then reset your password</Link>.</p>
            <div className="row">
              <div className="col-12 col-md-6 mb-3 mx-auto">
                {/* {this.renderAlert()} */}
                <form className="w-100 d-block" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" className="form-control" aria-describedby="email" autoComplete="username email" value={this.state.email} onChange={this.handleChange} />
                    <div className="invalid-feedback"></div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" className="form-control" aria-describedby="password" autoComplete="current-password" value={this.state.password} onChange={this.handleChange} />
                    <div className="invalid-feedback"></div>
                  </div>
                  <button className="btn btn-primary" type="submit">Login</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

// const validate = formValues => {
//   const errors = {};

//   if (!formValues.email) {
//     errors.email = 'Please enter a valid email';
//   }

//   if (!formValues.password) {
//     errors.password = 'Please enter a valid password';
//   }

//   return errors;
// }

const mapStateToProps = state => {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { login })(Login);