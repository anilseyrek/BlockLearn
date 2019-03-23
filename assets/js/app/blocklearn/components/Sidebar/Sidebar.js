// SideBar.js

import React, {Component} from 'react';

export default class Sidebar extends Component {
    render(){
        return (
          <aside className="menu-sidebar2 js-right-sidebar d-block d-lg-none">
              <div className="logo">
                  <a href="#">
                      <img src={"/static/images/icon/logo-white.png"} alt="Cool Admin" />
                  </a>
              </div>
              <div className="menu-sidebar2__content js-scrollbar2">
                  <div className="account2">
                      <div className="image img-cir img-120">
                          <img src={"/static/images/icon/1.jpg"} alt="Anıl Seyrek" />
                      </div>
                      <h4 className="name">Anıl Seyrek</h4>
                      <a href="#">Sign out</a>
                  </div>
                  <nav className="navbar-sidebar2">
                      <ul className="list-unstyled navbar__list">
                          <li className="active has-sub">
                              <a className="js-arrow" href="#">
                                  <i className="fas fa-tachometer-alt"></i>Dashboard
                                  <span className="arrow">
                                      <i className="fas fa-angle-down"></i>
                                  </span>
                              </a>
                              <ul className="list-unstyled navbar__sub-list js-sub-list">
                                  <li>
                                      <a href="index.html">
                                          <i className="fas fa-tachometer-alt"></i>Dashboard 1</a>
                                  </li>
                                  <li>
                                      <a href="index2.html">
                                          <i className="fas fa-tachometer-alt"></i>Dashboard 2</a>
                                  </li>
                                  <li>
                                      <a href="index3.html">
                                          <i className="fas fa-tachometer-alt"></i>Dashboard 3</a>
                                  </li>
                                  <li>
                                      <a href="index4.html">
                                          <i className="fas fa-tachometer-alt"></i>Dashboard 4</a>
                                  </li>
                              </ul>
                          </li>
                          <li>
                              <a href="inbox.html">
                                  <i className="fas fa-chart-bar"></i>Inbox</a>
                              <span className="inbox-num">3</span>
                          </li>
                          <li>
                              <a href="#">
                                  <i className="fas fa-shopping-basket"></i>eCommerce</a>
                          </li>
                          <li className="has-sub">
                              <a className="js-arrow" href="#">
                                  <i className="fas fa-trophy"></i>Features
                                  <span className="arrow">
                                      <i className="fas fa-angle-down"></i>
                                  </span>
                              </a>
                              <ul className="list-unstyled navbar__sub-list js-sub-list">
                                  <li>
                                      <a href="table.html">
                                          <i className="fas fa-table"></i>Tables</a>
                                  </li>
                                  <li>
                                      <a href="form.html">
                                          <i className="far fa-check-square"></i>Forms</a>
                                  </li>
                                  <li>
                                      <a href="#">
                                          <i className="fas fa-calendar-alt"></i>Calendar</a>
                                  </li>
                                  <li>
                                      <a href="map.html">
                                          <i className="fas fa-map-marker-alt"></i>Maps</a>
                                  </li>
                              </ul>
                          </li>
                          <li className="has-sub">
                              <a className="js-arrow" href="#">
                                  <i className="fas fa-copy"></i>Pages
                                  <span className="arrow">
                                      <i className="fas fa-angle-down"></i>
                                  </span>
                              </a>
                              <ul className="list-unstyled navbar__sub-list js-sub-list">
                                  <li>
                                      <a href="login.html">
                                          <i className="fas fa-sign-in-alt"></i>Login</a>
                                  </li>
                                  <li>
                                      <a href="register.html">
                                          <i className="fas fa-user"></i>Register</a>
                                  </li>
                                  <li>
                                      <a href="forget-pass.html">
                                          <i className="fas fa-unlock-alt"></i>Forget Password</a>
                                  </li>
                              </ul>
                          </li>
                          <li className="has-sub">
                              <a className="js-arrow" href="#">
                                  <i className="fas fa-desktop"></i>UI Elements
                                  <span className="arrow">
                                      <i className="fas fa-angle-down"></i>
                                  </span>
                              </a>
                              <ul className="list-unstyled navbar__sub-list js-sub-list">
                                  <li>
                                      <a href="button.html">
                                          <i className="fab fa-flickr"></i>Button</a>
                                  </li>
                                  <li>
                                      <a href="badge.html">
                                          <i className="fas fa-comment-alt"></i>Badges</a>
                                  </li>
                                  <li>
                                      <a href="tab.html">
                                          <i className="far fa-window-maximize"></i>Tabs</a>
                                  </li>
                                  <li>
                                      <a href="card.html">
                                          <i className="far fa-id-card"></i>Cards</a>
                                  </li>
                                  <li>
                                      <a href="alert.html">
                                          <i className="far fa-bell"></i>Alerts</a>
                                  </li>
                                  <li>
                                      <a href="progress-bar.html">
                                          <i className="fas fa-tasks"></i>Progress Bars</a>
                                  </li>
                                  <li>
                                      <a href="modal.html">
                                          <i className="far fa-window-restore"></i>Modals</a>
                                  </li>
                                  <li>
                                      <a href="switch.html">
                                          <i className="fas fa-toggle-on"></i>Switchs</a>
                                  </li>
                                  <li>
                                      <a href="grid.html">
                                          <i className="fas fa-th-large"></i>Grids</a>
                                  </li>
                                  <li>
                                      <a href="fontawesome.html">
                                          <i className="fab fa-font-awesome"></i>FontAwesome</a>
                                  </li>
                                  <li>
                                      <a href="typo.html">
                                          <i className="fas fa-font"></i>Typography</a>
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
