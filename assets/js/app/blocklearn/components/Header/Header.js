// Header.js
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {progress, auth} from "../../actions";

class Header extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    submitProgress() {

      let courseIndex = this.props.progressIndex;
      let _progress = this.props.progress[courseIndex];
      //console.log(document.getElementById("slide-deck").contentWindow.location.href.replace('http://' + window.location.hostname + ':' + window.location.port, ''));
      _progress.course_URL = document.getElementById("slide-deck").contentWindow.location.href.replace('http://' + window.location.hostname + ':' + window.location.port, '');
      let courseURL = _progress.course_URL; //.substring(progress.course_URL.indexOf("#") + 1);;
      //Regex for progress number
       var re1='.*?';	// Non-greedy match on filler
       var re2='(#)';	// Any Single Character 1
       var re3='(\\/)';	// Any Single Character 2
       var re4='(\\d+)';	// Integer Number 1

      var p = new RegExp(re1+re2+re3+re4,["i"]);
      var m = p.exec(courseURL);
      //Check if URL contains progress number
      let progressText = (m !== null) ? m[3] : "0";
      //console.log(progressText);
      //Extract static course
      courseURL = courseURL.substring(0, courseURL.indexOf("#"));

      this.props.progress[courseIndex].progress_number = progressText;

      this.setState({course_URL: courseURL, progress_number: progressText, updateProgressId: _progress.id});
      //console.log(progressText);
      this.props.updateProgress(courseIndex, _progress.id, courseURL, _progress.course_name, _progress.course_code, progressText, _progress.last_reached_progress);
      this.setState({timerOn: false});
    }

    onClickSignOut(e) {
      console.log("hele hele");
      if(this.props.onLearningPage) this.submitProgress();
      this.props.logout();
    }

    render(){
        return (
          <header className="header-desktop2">
              <div className="section__content section__content--p30">
                  <div className="container-fluid">
                      <div className="header-wrap2">
                          <div className="logo d-block d-lg-none">
                              <a href="#">
                                  <img src={"/static/images/icon/logo-white.png"} alt="BlockLearn" />
                              </a>
                          </div>
                          <div className="header-button2">
                              <div className="header-button-item js-item-menu">
                                  <i className="zmdi zmdi-search"></i>
                                  <div className="search-dropdown js-dropdown">
                                      <form action="">
                                          <input className="au-input au-input--full au-input--h65" type="text" placeholder="Search for course materials &amp; users..." />
                                          <span className="search-dropdown__icon">
                                              <i className="zmdi zmdi-search"></i>
                                          </span>
                                      </form>
                                  </div>
                              </div>
                              <div className="header-button-item mr-0 js-sidebar-btn">
                                  <i className="zmdi zmdi-menu"></i>
                              </div>
                              <div className="setting-menu js-right-sidebar d-none d-lg-block">
                                  <div className="account-dropdown__body">
                                      <div className="account-dropdown__item">
                                          <a href="/">
                                              <i className="zmdi zmdi-globe"></i>Home</a>
                                      </div>
                                      <div className="account-dropdown__item">
                                          <a href="/logout" onClick={(e) => this.onClickSignOut(e)}>
                                              <i className="zmdi zmdi-account"></i>Logout</a>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </header>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        progress: state.progress,
        user: state.auth.user,
        onLearningPage: ownProps.onLearningPage,
        progressIndex: ownProps.progressIndex,
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);


//////NOTIFICATION ELEMENTS
/*

<div className="header-button-item has-noti js-item-menu">
    <i className="zmdi zmdi-notifications"></i>
    <div className="notifi-dropdown js-dropdown">
        <div className="notifi__title">
            <p>You have 3 Notifications</p>
        </div>
        <div className="notifi__item">
            <div className="bg-c1 img-cir img-40">
                <i className="zmdi zmdi-email-open"></i>
            </div>
            <div className="content">
                <p>You got a email notification</p>
                <span className="date">April 12, 2018 06:50</span>
            </div>
        </div>
        <div className="notifi__item">
            <div className="bg-c2 img-cir img-40">
                <i className="zmdi zmdi-account-box"></i>
            </div>
            <div className="content">
                <p>Your account has been blocked</p>
                <span className="date">April 12, 2018 06:50</span>
            </div>
        </div>
        <div className="notifi__item">
            <div className="bg-c3 img-cir img-40">
                <i className="zmdi zmdi-file-text"></i>
            </div>
            <div className="content">
                <p>You got a new file</p>
                <span className="date">April 12, 2018 06:50</span>
            </div>
        </div>
        <div className="notifi__footer">
            <a href="#">All notifications</a>
        </div>
    </div>
</div>
*/
