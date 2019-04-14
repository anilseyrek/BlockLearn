import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";

class Login extends Component {

    state = {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.register(this.state.first_name, this.state.last_name, this.state.username, this.state.email, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        return (
          <div className="page-wrapper">
              <div className="page-content--bge5">
                  <div className="container">
                      <div className="login-wrap">
                          <div className="login-content">
                              <div className="login-logo">
                                  <a href="#">
                                      <img src={"/static/images/icon/logo.png"} alt="BlockLearn" />
                                  </a>
                              </div>
                              <div className="login-form">
                                  <form action="" method="post" onSubmit={this.onSubmit}>
                                      <div className="form-group">
                                          <label htmlFor="first_name">First Name</label>
                                          <input className="au-input au-input--full" type="text" id="first_name" name="first_name" placeholder="First Name" onChange={e => this.setState({first_name: e.target.value})} />
                                      </div>
                                      <div className="form-group">
                                          <label htmlFor="last_name">Last Name</label>
                                          <input className="au-input au-input--full" type="text" id="last_name" name="last_name" placeholder="Last Name" onChange={e => this.setState({last_name: e.target.value})} />
                                      </div>
                                      <div className="form-group">
                                          <label htmlFor="username">Username</label>
                                          <input className="au-input au-input--full" type="text" id="username" name="username" placeholder="Username" onChange={e => this.setState({username: e.target.value})} />
                                      </div>
                                      <div className="form-group">
                                          <label htmlFor="email">Email</label>
                                          <input className="au-input au-input--full" type="text" id="email" name="email" placeholder="Email" onChange={e => this.setState({email: e.target.value})} />
                                      </div>
                                      <div className="form-group">
                                          <label htmlFor="password">Password</label>
                                          <input className="au-input au-input--full" type="password" id="password" name="password" placeholder="Password" onChange={e => this.setState({password: e.target.value})}/>
                                      </div>
                                      <div className="login-checkbox">
                                          <label>
                                              <input type="checkbox" name="aggree"/>Agree the terms and policy
                                          </label>
                                      </div>
                                      <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">register</button>
                                  </form>
                                  <div className="register-link">
                                      <p>
                                          Already have account?<br/>
                                          <Link to="/login">Login</Link>
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
        )
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return {field, message: state.auth.errors[field]};
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        register: (first_name, last_name, username, email, password) => dispatch(auth.register(first_name, last_name, username, email, password)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
