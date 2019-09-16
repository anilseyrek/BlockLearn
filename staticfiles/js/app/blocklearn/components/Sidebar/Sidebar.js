// SideBar.js

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {progress, auth} from "../../actions";
//import Timer from '../Timer';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import Content from '../Content';
//import $ from 'jquery';

class Sidebar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        timerOn: false,
        progressSaved: false,
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
      if(this.props.onLearningPage) this.submitProgress();
      this.props.logout();
    }

    render(){
        return (
          <aside className="menu-sidebar2">
            <div className="logo">
                <a href="/">
                    <img src={"/static/images/icon/logo-white.png"} alt="BlockLearn" />
                </a>
            </div>
            <div className="menu-sidebar2__content js-scrollbar1">
                <div className="account2">
                    <div className="image img-cir img-120">
                        <img src={"/static/images/icon/avatar.svg"} alt="Profile Avatar" />
                    </div>
                    <h4 className="name">{this.props.user.username}</h4>
                    <a href="#" onClick={(e) => this.onClickSignOut(e)} >Sign out</a>
                </div>
                {
                  !this.props.onLearningPage ? <nav className="navbar-sidebar2"></nav> : (
                <nav className="navbar-sidebar2">
                    <ul className="list-unstyled navbar__list">
                      <li className="active">
                      <a className="js-arrow" href="#">
                          <i className="fas fa-tachometer-alt"></i>Progress: <span id="progressNo"></span>

                      </a>

                      </li>
                    </ul>
                        <ul className="list-unstyled navbar__list">
                          <li className="active">
                          <a className="js-arrow" href="#">
                              <i className="fas fa-tachometer-alt"></i>Timer:&nbsp;&nbsp;
                              <span id="timer">
                                <div id="sidebar" style={{display : 'inline-block'}} >
                              <React.Fragment>
                              <Timer active={this.props.timerOn} duration={null}>
                                <Timecode />
                              </Timer>
                              </React.Fragment>
                                </div>
                              </span>

                          </a>

                          </li>
                        </ul>
                        {
                          !this.props.contentActive ? <div></div> : (
                        <ul className="list-unstyled navbar__list">
                            <li className="active has-sub">
                                <a className="js-arrow" href="#">
                                    <i className="fas fa-tachometer-alt"></i>Course
                                </a>
                            </li>
                            <Content />
                          </ul>
                    )}
                  </nav>
                )}
              </div>
          </aside>
        )
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        progress: state.progress,
        user: state.auth.user,
        timerOn: ownProps.timerOn,
        contentActive: ownProps.contentActive,
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
