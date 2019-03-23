import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';
import Sidebar2 from './Sidebar2';
import Breadcrumb from './Breadcrumb'
import PerfectScrollbar from 'perfect-scrollbar';

import {progress, auth} from "../actions";

class UserPanel extends Component {

    static updateUserPanel(){

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
      try {
        var menu = $('.js-item-menu');
        var sub_menu_is_showed = -1;

        for (var i = 0; i < menu.length; i++) {
          $(menu[i]).on('click', function (e) {
            e.preventDefault();
            $('.js-right-sidebar').removeClass("show-sidebar");
            if (jQuery.inArray(this, menu) == sub_menu_is_showed) {
              $(this).toggleClass('show-dropdown');
              sub_menu_is_showed = -1;
            }
            else {
              for (var i = 0; i < menu.length; i++) {
                $(menu[i]).removeClass("show-dropdown");
              }
              $(this).toggleClass('show-dropdown');
              sub_menu_is_showed = jQuery.inArray(this, menu);
            }
          });
        }
        $(".js-item-menu, .js-dropdown").click(function (event) {
          event.stopPropagation();
        });

        $("body,html").on("click", function () {
          for (var i = 0; i < menu.length; i++) {
            menu[i].classList.remove("show-dropdown");
          }
          sub_menu_is_showed = -1;
        });

      } catch (error) {
        console.log(error);
      }

      var wW = $(window).width();
        // Right Sidebar
        var right_sidebar = $('.js-right-sidebar');
        var sidebar_btn = $('.js-sidebar-btn');

        sidebar_btn.on('click', function (e) {
          e.preventDefault();
          for (var i = 0; i < menu.length; i++) {
            menu[i].classList.remove("show-dropdown");
          }
          sub_menu_is_showed = -1;
          right_sidebar.toggleClass("show-sidebar");
        });

        $(".js-right-sidebar, .js-sidebar-btn").click(function (event) {
          event.stopPropagation();
        });

        $("body,html").on("click", function () {
          right_sidebar.removeClass("show-sidebar");

        });

        try {
          // Hamburger Menu
          $('.hamburger').on('click', function () {
            $(this).toggleClass('is-active');
            $('.navbar-mobile').slideToggle('500');
          });
          $('.navbar-mobile__list li.has-dropdown > a').on('click', function () {
            var dropdown = $(this).siblings('ul.navbar-mobile__dropdown');
            $(this).toggleClass('active');
            $(dropdown).slideToggle('500');
            return false;
          });
        } catch (error) {
          console.log(error);
        }


        try {
          var jscr1 = $('.js-scrollbar1');
          if(jscr1[0]) {
            const ps1 = new PerfectScrollbar('.js-scrollbar1');
          }

          var jscr2 = $('.js-scrollbar2');
          if (jscr2[0]) {
            const ps2 = new PerfectScrollbar('.js-scrollbar2');

          }

        } catch (error) {
          console.log(error);
        }

    }

    componentDidMount() {
        this.props.fetchProgress();
        UserPanel.updateUserPanel();
    }

    componentDidUpdate() {
      UserPanel.updateUserPanel();
    }

    state = {
        text: "",
        updateProgressId: null,
    }

    resetForm = () => {
        this.setState({text: "", updateProgressId: null});
    }

    selectForEdit = (id) => {
        let progress = this.props.progress[id];
        this.setState({text: progress.text, updateProgressId: id});
    }

    submitProgress = (e) => {
        e.preventDefault();
        if (this.state.updateProgressId === null) {
            this.props.addProgress(this.state.text).then(this.resetForm)
        } else {
            this.props.updateProgress(this.state.updateProgressId, this.state.text).then(this.resetForm);
        }
    }



    render() {
        return (

          <div>
          <div className="page-wrapper">
              <Sidebar2 />
          </div>
          <div className="page-container2">

                  <Header />
                  <Sidebar />
                  <Breadcrumb />
                  <section className="statistic">
                    <div className="section__content section__content">
                        <div id="slide-deck-container">
                          <iframe id="slide-deck" width="100%" height="100%" marginHeight="0" marginWidth="0" src={"/static/courses/blockchain.html"}>
                              Fallback text here for unsupporting browsers, of which there are scant few.
                          </iframe>
                        </div>
                    </div>
                </section>

          </div>
        </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        progress: state.progress,
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProgress: () => {
            dispatch(progress.fetchProgress());
        },
        addProgress: (text) => {
            return dispatch(progress.addProgress(text));
        },
        updateProgress: (id, text) => {
            return dispatch(progress.updateProgress(id, text));
        },
        deleteProgress: (id) => {
            dispatch(progress.deleteProgress(id));
        },
        logout: () => dispatch(auth.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);

/*

////////Progress PARTS


  <div>
      <h2>Welcome to Progress!</h2>
      <hr />
      <div style={{textAlign: "right"}}>
          {this.props.user.username} (<a onClick={this.props.logout}>logout</a>)
      </div>

      <h3>Add new progress</h3>
      <form onSubmit={this.submitProgress}>
          <input
              value={this.state.text}
              placeholder="Enter progress here..."
              onChange={(e) => this.setState({text: e.target.value})}
              required />
          <button onClick={this.resetForm}>Reset</button>
          <input type="submit" value="Save Progress" />
      </form>

      <h3>Progresss</h3>
      <table>
          <tbody>
              {this.props.progress.map((progress, id) => (
                  <tr key={`progress_${progress.id}`}>
                      <td>{progress.text}</td>
                      <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>
                      <td><button onClick={() => this.props.deleteProgress(id)}>delete</button></td>
                  </tr>
              ))}
          </tbody>
      </table>
  </div>


*/
