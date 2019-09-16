// Breadcrumb.js
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {progress, auth} from "../../actions";
import { TimerContext } from '../UserPanel';

 class Breadcrumb extends Component {
      constructor(props) {
        super(props);
        this.state = {
          timerOn: false,
          progressSaved: false,
        }
      }

     componentDidMount() {
         //this.props.fetchProgress();
     }

     submitProgress = (e) => {
         e.preventDefault();
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
         var handleTime = this.props.handleTimer;
         handleTime(false);
         var handleProgressSave = this.props.handleProgressSave;
         handleProgressSave(true);
     }

      fullscreen() {
       // check if fullscreen mode is available
         if (document.fullscreenEnabled ||
           document.webkitFullscreenEnabled ||
           document.mozFullScreenEnabled ||
           document.msFullscreenEnabled) {

           // which element will be fullscreen
           var iframe = document.querySelector('#slide-deck');
           // Do fullscreen
           if (iframe.requestFullscreen) {
             iframe.requestFullscreen();
           } else if (iframe.webkitRequestFullscreen) {
             iframe.webkitRequestFullscreen();
           } else if (iframe.mozRequestFullScreen) {
             iframe.mozRequestFullScreen();
           } else if (iframe.msRequestFullscreen) {
             iframe.msRequestFullscreen();
           }
         }
         else {
           document.querySelector('.error').innerHTML = 'Your browser is not supported';
         }
      }

      fullscreenChange() {
         if (document.fullscreenEnabled ||
              document.webkitIsFullScreen ||
              document.mozFullScreen ||
              document.msFullscreenElement) {
           console.log('enter fullscreen');
         }
         else {
           console.log('exit fullscreen');
         }
         // force to reload iframe once to prevent the iframe source didn't care about trying to resize the window
         // comment this line and you will see
         var iframe = document.querySelector('iframe');
         iframe.src = iframe.src;
      }

    render(){
        return (
          <section className="au-breadcrumb m-t-75">
            <div className="section__content section__content--p30">
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-md-12">
                          <div className="au-breadcrumb-content">
                              <div className="au-breadcrumb-left">
                                  <span className="au-breadcrumb-span"></span>
                                  <ul className="list-unstyled list-inline au-breadcrumb__list">
                                      <li className="list-inline-item active">
                                          <a href="/">Home</a>
                                      </li>
                                      <li className="list-inline-item seprate">
                                          <span>/</span>
                                      </li>
                                      <li className="list-inline-item">{this.props.pageName}</li>
                                  </ul>
                              </div>
                              {
                                !this.props.onLearningPage ? <div className="au-breadcrumb-right"></div> : (
                                  <div className="au-breadcrumb-right">
                                    <button className="au-btn" id="save-progress" onClick={this.submitProgress}>Save My Progress</button>&nbsp;
                                    <button className="au-btn" id="fullscreen-button" onClick={this.fullscreen}>Fullscreen</button>
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        progress: state.progress,
        user: state.auth.user,
        timerOn: ownProps.timerOn,
        progressSaved: ownProps.progressSaved,
        pageName: ownProps.pageName,
        onLearningPage: ownProps.onLearningPage,
        progressIndex: ownProps.progressIndex,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProgress: () => {
            dispatch(progress.fetchProgress());
        },
        addProgress: (course_URL) => {
            return dispatch(progress.addProgress(course_URL));
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

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
