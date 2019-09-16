import React, { Component } from 'react';
//import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';
import CourseCatalogue from './CourseCatalogue';
import Breadcrumb from './Breadcrumb'
import PerfectScrollbar from 'perfect-scrollbar';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';

import {progress, auth} from "../actions";

class UserPanel extends Component {

    constructor(props){
      super(props);
      this.state = {
        message: '',
        timerOn: false,
        progressSaved: false,
        contentActive: false,
        isFetching: true,
        course_URL: "",
        course_code: "",
        course_name: "",
        progress_number: "",
        last_reached_progress: "",
        updateProgressId: null,
      };
    }

    componentDidMount() {
        UserPanel.updateUserPanel();
        this.props.fetchProgress();
        this.state.isFetching = false;
    }

    componentWillUnmount(){
    }

    componentDidUpdate() {

    }

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

    resetForm = () => {
        this.setState({course_URL: "", progress_number: "", last_reached_progress: "", updateProgressId: null});
    }

    selectForEdit = (id) => {
        let progress = this.props.progress[id];
        this.setState({course_URL: progress.course_URL, progress_number: progress.progress_number, last_reached_progress: progress.last_reached_progress, updateProgressId: id});
    }

    submitProgress = (e) => {
        e.preventDefault();
        if (this.state.updateProgressId === null) {
            this.props.addProgress(this.state.course_URL, this.state.course_name, this.state.course_code, this.state.progress_number, this.state.last_reached_progress).then(this.resetForm)
        } else {
            this.props.updateProgress(this.state.updateProgressId, this.state.course_URL, this.state.course_name, this.state.course_code, this.state.progress_number, this.state.last_reached_progress).then(this.resetForm);
        }
    }

    render() {
        const {isFetching, timerOn} = this.state;

        return (

          <div>
          <div className="page-wrapper">
              <Sidebar onLearningPage={false} timerOn={this.state.timerOn} contentActive={this.state.contentActive}/>
          </div>
          <div className="page-container2">

                  <Header />
                  <Breadcrumb onLearningPage={false} pageName="Catalogue" />
                  <CourseCatalogue />


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
        addProgress: (course_URL, course_name, course_code, progress_number, last_reached_progress) => {
            return dispatch(progress.addProgress(course_URL, course_name, course_code, progress_number, last_reached_progress));
        },
        updateProgress: (courseIndex, id, course_URL, course_name, course_code, progress_number, last_reached_progress) => {
            return dispatch(progress.updateProgress(courseIndex, id, course_URL, course_name, course_code, progress_number, last_reached_progress));
        },
        deleteProgress: (id) => {
            dispatch(progress.deleteProgress(id));
        },
        logout: () => dispatch(auth.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
/*
{
  isFetching ? <div>Loading...</div> : (
    <section className="statistic">
      <div className="section__content section__content">
          <div id="slide-deck-container">
            {
              firstCourse ? <iframe id="slide-deck" width="100%" height="100%" marginHeight="0" marginWidth="0" src={firstCourse}>
                  Your browser is not supported.
              </iframe> : (
              this.props.progress.slice(0, 1).map((progress) => (
                <iframe id="slide-deck" width="100%" height="100%" marginHeight="0" marginWidth="0" key={`progress_${progress.id}`} src={`${progress.course_URL}#/${progress.progress_number}`} onLoad={(e) => this.iframeLoad(e)} >
                    Your browser is not supported.
                </iframe>
              ))

            )}
          </div>
      </div>
  </section>
)}
*/


/*              <section>{JSON.stringify(this.props.progress[0])}<br/>
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
              </table></section>
*/

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
