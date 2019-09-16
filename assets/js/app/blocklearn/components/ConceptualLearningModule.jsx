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

import {progress, auth, course} from "../actions";

class ConceptualLearningModule extends Component {

    constructor(props){
      super(props);
      this.state = {
        message: '',
        timerOn: false,
        progressSaved: false,
        contentActive: false,
        courseCode: '',
        isFetching: true,
        course_URL: "",
        course_code: "",
        course_name: "",
        progress_number: "",
        last_reached_progress: "",
        updateProgressId: null,
        total_progress_number: "",
      };
      this.handleEnter = this.handleEnter.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.handleTimer = this.handleTimer.bind(this);
      this.handleProgressSave = this.handleProgressSave.bind(this);
    }

    componentDidMount() {

        ConceptualLearningModule.updateUserPanel();
        this.props.fetchProgress();
        this.props.fetchCourses();
        () => this.handleProgress();
        this.state.isFetching = false;
        document.addEventListener('keydown', this.handleKeyPress);
        window.addEventListener('message', this.handleIframeChange);


    }

    componentWillUnmount(){
      document.removeEventListener('keydown', this.handleKeyPress);
    }

    componentDidUpdate() {

    }

    iframeLoad(e){
        var iframe = e.target; // it is equal to "this.videoFrame" and so, you can avoid using "ref"
        //this.videoFrame.addEventListener('keydown',this.onVideoDown);
        iframe.contentWindow.document.addEventListener('keydown', this.handleKeyPress);
        this.handleProgress();
    }

    handleEnter = () => {
      this.setState({
        message: this.state.message + 'You pressed the space key! '
      });
    }
    handleKeyPress = (event) => {
      //
      if (event.keyCode === 32) {
        this.handleEnter();
      }
    }
    handleTimer = (timerSetting) => {
      this.setState({
        timerOn: timerSetting
      })
    }
    handleProgressSave = (progressSavedState) => {
      this.setState({
        progressSaved: progressSavedState
      })
    }
    resizeIframe = () => {
      var buffer = 20; //scroll bar buffer
      var iframe = document.getElementById('slide-deck');

      function pageY(elem) {
          return elem.offsetParent ? (elem.offsetTop + pageY(elem.offsetParent)) : elem.offsetTop;
      }

      function resize() {
          var height = document.documentElement.clientHeight;
          height -= pageY(document.getElementById('slide-deck'))+ buffer ;
          height = (height < 0) ? 0 : height;
          document.getElementById('slide-deck').style.height = height + 'px';
      }

      // .onload doesn't work with IE8 and older.
      if (iframe.attachEvent) {
          iframe.attachEvent("onload", resize);
      } else {
          iframe.onload=resize;
      }

      window.onresize = resize;

    }
    handleIframeChange = (e) => {
      if (e.data === "slidechanged" || e.data === "Reveal_Initialized") {

        this.resizeIframe();

        var courseURL = document.getElementById("slide-deck").contentWindow.location.href.replace('http://' + window.location.hostname + ':' + window.location.port, '');

        //Regex for progress number
         var re1='.*?';	// Non-greedy match on filler
         var re2='(#)';	// Any Single Character 1
         var re3='(\\/)';	// Any Single Character 2
         var re4='(\\d+)';	// Integer Number 1

        var regex1 = new RegExp(re1+re2+re3+re4,["i"]);
        var regex2 = new RegExp(re1+re2+re3+re1+re3+re4,["i"]);
        var m = regex1.exec(courseURL);
        var n = regex2.exec(courseURL);
        //Check if URL contains progress number
        let progressText = (m !== null) ? m[3] : "0";
        //Extract static course
        courseURL = courseURL.substring(0, courseURL.indexOf("#"));

        document.getElementById("progressNo").innerHTML = progressText + " / " + this.state.total_progress_number ;
        //console.log(this.state.progressSaved);
        if(e.data === "slidechanged" && (!(this.state.progressSaved) || n === null)) this.setState({timerOn: true});
        else this.setState({timerOn: false, progressSaved: false});
        /*{
          if(n === null) this.setState({timerOn: true});
          else this.setState({timerOn: false});
        }*/
      }
      if(e.data === "goToCoding") {
        this.props.history.push('/experiential');
      }
    };

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

    handleProgress = () =>{

      var tempCourse = null;
      var cCode = this.props.match.params.courseCode.toUpperCase();
      var i;
      for (i in this.props.courses){
        tempCourse = this.props.courses[i];
        if(cCode === tempCourse.course_code) break;
      }
      this.setState({total_progress_number: tempCourse.total_progress_number});

      if (this.props.progress.length === 0) {
        this.props.addProgress(tempCourse.course_URL, tempCourse.course_name, tempCourse.course_code, "0", "0").then(this.resetForm);
        this.setState({course_URL: tempCourse.course_URL, course_name: tempCourse.course_name, progress_number: "0", last_reached_progress: "0", updateProgressId: 0}, () => {
          console.log(this.state.progress_number, 'course_URL');
        });
      }
      else {
        // Get progress course_code
        let tempProgress = null;
        var courseFoundInProgress = false;
        var i;
        for (i in this.props.progress) {
          var cCode = this.props.match.params.courseCode.toUpperCase();
          var courseInProgress = this.props.progress[i];
          tempProgress = courseInProgress;
          if(cCode === courseInProgress.course_code) {
            courseFoundInProgress= true;
            this.setState({updateProgressId: i}, () => {
              //console.log(this.state.updateProgressId, 'IDID');
            });
            break;
          }
        }
        if(courseFoundInProgress){
            this.setState({course_URL: tempCourse.course_URL, course_name: tempCourse.course_name, progress_number: tempProgress.progress_number, last_reached_progress: tempProgress.last_reached_progress}, () => {
              //console.log(this.state.progress_number, 'course_URL');
            });
        }
        else{
          this.props.addProgress(tempCourse.course_URL, tempCourse.course_name, tempCourse.course_code, "0", "0").then(this.resetForm);
          this.setState({course_URL: tempCourse.course_URL, course_name: tempCourse.course_name, progress_number: "0", last_reached_progress: "0"}, () => {
            //console.log(this.state.progress_number, 'course_URL');
          });
        }

      }


    }



    render() {
        var handleTimer = this.handleTimer;
        var handleProgressSave = this.handleProgressSave;
        const {isFetching, timerOn} = this.state;

        return (

          <div>
          <div className="page-wrapper">
              <Sidebar progressIndex={this.state.updateProgressId} onLearningPage={true} timerOn={this.state.timerOn} contentActive={this.state.contentActive}/>
          </div>
          <div className="page-container2">

                  <Header onLearningPage={true} progressIndex={this.state.updateProgressId} />
                  <Breadcrumb progressIndex={this.state.updateProgressId} onLearningPage={true} pageName={this.state.course_name} handleTimer={handleTimer.bind(this)} handleProgressSave={handleProgressSave.bind(this)}/>
                  {
                    isFetching ? <div>Loading...</div> : (
                      <section className="statistic">
                        <div className="section__content section__content">
                            <div id="slide-deck-container">
                              <iframe id="slide-deck" width="100%" height="100%" marginHeight="0" marginWidth="0" src={`${this.state.course_URL}#/${this.state.progress_number}`} onLoad={(e) => this.iframeLoad(e)} >
                                  Your browser is not supported.
                              </iframe>

                            </div>
                        </div>
                    </section>
                  )}


          </div>
        </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        progress: state.progress,
        user: state.auth.user,
        courses: state.course,
        courseCode: ownProps.match.params.courseCode,
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
        fetchCourses: () => {
            dispatch(course.fetchCourses());
        },
        logout: () => dispatch(auth.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConceptualLearningModule);

/*
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
