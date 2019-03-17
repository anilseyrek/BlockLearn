import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';
import Sidebar2 from './Sidebar2';
import Breadcrumb from './Breadcrumb'

import {progress, auth} from "../actions";

class Progress extends Component {

    componentDidMount() {
        this.props.fetchProgress();
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
      //var body = document.getElementsByTagName("BODY")[0];
      //body.className='animsition';
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


export default connect(mapStateToProps, mapDispatchToProps)(Progress);

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
