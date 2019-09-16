// SideBar.js

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {progress, auth} from "../../actions";
//import $ from 'jquery';

const sectionStyle = {
  paddingTop: '50px',
};

class CourseCatalogue extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    render(){
        return (
          <section className="statistic" style={sectionStyle}>
                <div className="section__content section__content--p30">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 col-lg-3">
                              <Link to="/conceptual/boun-ct-1">
                                <div className="statistic__item">
                                    <h3 className="number"><span className="desc">BOUN-CT-1</span></h3>
                                    <h3>CİNSEL TACİZİ ÖNLEME EĞİTİMİ</h3>
                                    <div className="icon">
                                        <i className="zmdi zmdi-calendar-note"></i>
                                    </div>
                                </div>
                              </Link>
                            </div>
                            <div className="col-md-6 col-lg-3">
                              <Link to="/conceptual/bc-101">
                                <div className="statistic__item">
                                    <h3 className="number"><span className="desc">BC-101</span></h3>
                                    <h3>BLOCKCHAIN BASICS</h3>
                                    <div className="icon">
                                        <i className="zmdi zmdi-calendar-note"></i>
                                    </div>
                                </div>
                              </Link>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProgress: () => {
            dispatch(progress.fetchProgress());
        },
        addProgress: (course_URL, course_name, course_code, progress_number) => {
            return dispatch(progress.addProgress(course_URL, course_name, course_code, progress_number));
        },
        updateProgress: (courseIndex, id, course_URL, course_name, course_code, progress_number) => {
            return dispatch(progress.updateProgress(courseIndex, id, course_URL, course_name, course_code, progress_number));
        },
        deleteProgress: (id) => {
            dispatch(progress.deleteProgress(id));
        },
        logout: () => dispatch(auth.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseCatalogue);
