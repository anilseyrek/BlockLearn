import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";

class Login extends Component {

    state = {
        username: "",
        password: "",
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
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
                                            <label htmlFor="username">Username</label>
                                            <input className="au-input au-input--full" type="text" id="username" name="username" placeholder="username" onChange={e => this.setState({username: e.target.value})} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input className="au-input au-input--full" type="password" id="password" name="password" placeholder="Password" onChange={e => this.setState({password: e.target.value})} />
                                        </div>
                                        <div className="login-checkbox">
                                            <label>
                                                <input type="checkbox" name="remember" />Remember Me
                                            </label>
                                            <label>
                                                <a href="#">Forgotten Password?</a>
                                            </label>
                                        </div>
                                        <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">sign in</button>
                                    </form>
                                    <div className="register-link">
                                        <p>
                                            Don't you have account?
                                            <Link to="/register">Register</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                            <form onSubmit={this.onSubmit}>
                                <fieldset>
                                    <legend>Login</legend>
                                    {this.props.errors.length > 0 && (
                                        <ul>
                                            {this.props.errors.map(error => (
                                                <li key={error.field}>{error.message}</li>
                                            ))}
                                        </ul>
                                    )}
                                    <p>
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text" id="username"
                                            onChange={e => this.setState({username: e.target.value})} />
                                    </p>
                                    <p>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password" id="password"
                                            onChange={e => this.setState({password: e.target.value})} />
                                    </p>
                                    <p>
                                        <button type="submit">Login</button>
                                    </p>

                                    <p>
                                        Don't have an account? <Link to="/register">Register</Link>
                                    </p>
                                </fieldset>
                            </form>

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
        login: (username, password) => {
            return dispatch(auth.login(username, password));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
