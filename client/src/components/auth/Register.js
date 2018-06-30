import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import * as API from '../../config';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm,
    }

    axios.post(API.API_USER_REGISTER, newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}));
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit} noValidate>
                <div className="form-group">
                  <input 
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    onChange={this.onInputChange} />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                  <input 
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    onChange={this.onInputChange} />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input 
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    onChange={this.onInputChange} />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                  <input 
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password_confirm
                    })}
                    placeholder="Confirm Password"
                    name="password_confirm"
                    onChange={this.onInputChange} />
                  {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                </div>
                <input 
                  type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;