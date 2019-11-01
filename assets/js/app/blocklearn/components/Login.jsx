import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";
import Modal from 'react-modal';

import {auth} from "../actions";

Modal.setAppElement('#alert-modal');

class Login extends Component {

    constructor() {
      super();

      this.state = {
        modalIsOpen: false,
        username: "",
        password: "",
      };

      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
      this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
      // references are now sync'd and can be accessed.
      // this.subtitle.style.color = '#f00';
    }

    closeModal() {
      this.setState({modalIsOpen: false});
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
        if(this.props.activationRequired){
          this.openModal();
        }
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
                                                <a href="/password_reset/">Forgotten Password?</a>
                                            </label>
                                        </div>
                                        <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">sign in</button>
                                    </form>
                                    <div className="register-link">
                                        <p>
                                            Don't you have account?<br/>
                                            <Link to="/register">Register</Link>
                                        </p>
                                        <Modal
                                          isOpen={this.state.modalIsOpen}
                                          onAfterOpen={this.afterOpenModal}
                                          onRequestClose={this.closeModal}
                                          contentLabel="Login Modal"
                                          className="modal-open fade show "
                                          id="smallmodal" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true"
                                        >
                                          <div className="modal-dialog modal-sm" role="document">
                                  					<div className="modal-content">
                                  						<div className="modal-header">
                                  							<h5 className="modal-title" id="mediumModalLabel">Account Activation</h5>
                                  							<button onClick={this.closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  								<span aria-hidden="true">&times;</span>
                                  							</button>
                                  						</div>
                                  						<div className="modal-body">
                                  							<p>
                                                  Please confirm your email first!
                                  							</p>
                                  						</div>
                                  						<div className="modal-footer">
                                  							<button onClick={this.closeModal} type="button" className="au-btn au-btn--block au-btn--green m-b-10">Close</button>
                                  						</div>
                                  					</div>
                                  				</div>
                                        </Modal>

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
        isAuthenticated: state.auth.isAuthenticated,
        activationRequired: state.auth.activationRequired
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
