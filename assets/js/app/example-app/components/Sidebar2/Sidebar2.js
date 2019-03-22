// SideBar.js

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {auth} from "../../actions";
//import $ from 'jquery';

class Sidebar2 extends Component {
    render(){
        return (
          <aside className="menu-sidebar2">
            <div className="logo">
                <a href="#">
                    <img src={"/static/images/icon/logo-white.png"} alt="BlockLearn" />
                </a>
            </div>
            <div className="menu-sidebar2__content js-scrollbar1">
                <div className="account2">
                    <div className="image img-cir img-120">
                        <img src={"/static/images/icon/1.jpg"} alt="Anıl Seyrek" />
                    </div>
                    <h4 className="name">{this.props.user.username}</h4>
                    <a href="#" onClick={this.props.logout}>Sign out</a>
                </div>
                <nav className="navbar-sidebar2">
                    <ul className="list-unstyled navbar__list">
                      <li className="active">
                      <a className="js-arrow" href="#">
                          <i className="fas fa-tachometer-alt"></i>Progress: <span id="progressNo"></span>

                      </a>

                      </li>
                    </ul>
                    <ul className="list-unstyled navbar__list">
                        <li className="active has-sub">
                            <a className="js-arrow" href="#">
                                <i className="fas fa-tachometer-alt"></i>Course Progress
                                <span className="arrow">
                                    <i className="fas fa-angle-down"></i>
                                </span>
                            </a>
                            <ul className="list-unstyled navbar__sub-list js-sub-list">
                                <li>
                                    <a href="index.html">
                                        <i className="fas fa-check"></i>Hash Demo</a>
                                </li>
                                <li>
                                    <a href="index2.html">
                                        <i className="fas fa-check"></i>Block Demo</a>
                                </li>
                                <li className="active ">
                                    <a href="index3.html">
                                        <i className="fas fa-tachometer-alt"></i>Blockchain Demo</a>
                                </li>
                                <li>
                                    <a href="index4.html">
                                        <i className="fas fa-tachometer-alt"></i>Distributed Ledger Demo</a>
                                </li>
                                <li>
                                    <a href="index4.html">
                                        <i className="fas fa-tachometer-alt"></i>Tokens Demo</a>
                                </li>
                                <li>
                                    <a href="index4.html">
                                        <i className="fas fa-tachometer-alt"></i>Coinbase Transactions Demo</a>
                                </li>
                            </ul>
                        </li>
                      </ul>
                  </nav>
              </div>
          </aside>
        )
    }
}



const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth.logout()),
    }
}

try {
  var arrow = $('.js-arrow');
  arrow.each(function () {
    var that = $(this);
    that.on('click', function (e) {
      e.preventDefault();
      that.find(".arrow").toggleClass("up");
      that.toggleClass("open");
      that.parent().find('.js-sub-list').slideToggle("250");
    });
  });

} catch (error) {
  console.log(error);
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar2);
