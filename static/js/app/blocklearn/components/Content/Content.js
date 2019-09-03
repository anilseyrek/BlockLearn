// Content.js
import React, {Component} from 'react';
import {connect} from 'react-redux';

export default class Content extends Component {

      state = {
        progressN: 0
      };
      constructor(props){
        super(props);
      }
// 'Let\'s add new function named <code>setMessage</code> which takes a string as parameter (i.e. <code>newMessage</code>) and sets it to <code>message</code>.<br/> When you\'re done, click "Next". <br/>'
      componentDidMount(){

          document.getElementById("progressNo").innerHTML = '0 / 13';
      }

    next(){
      const conts = ['First connect to localhost in order to edit our first programming file "HelloWorld.sol"','Let\'s add new function named <code>setMessage</code> which takes a string as parameter (i.e. <code>newMessage</code>).<br/> When you\'re done, click "Next". <br/>', 'Make necessary changes so that <code>setMessage</code> function sets <code>newMessage</code> to <code>message</code>.<br/> When you\'re done, click "Next". <br/>', "BMW"];
      /*let a = 0;
      console.log(this.state.progressN);*/
      let a = parseInt(document.getElementById("progressNo").innerHTML.substring(0,1));
      console.log(a);
      document.querySelector('.courseContent').innerHTML = conts[a];
      a = a+1;
      document.getElementById("progressNo").innerHTML = a + ' / 13';
    }

    previous(){
      document.querySelector('.courseContent').innerHTML = 'Let\'s add new function named <code>setMessage</code> which takes a string as parameter (i.e. <code>newMessage</code>) and sets it to <code>message</code>.<br/> When you\'re done, click "Next". <br/>';
    }

    render(){
        return (
          <div>
          <li className="active has-sub">
                <div className="courseContent">Welcome to your programming course. When you're ready, click "Next". <br/></div>
                <button className="au-btn" onClick={this.previous}> Previous </button> &nbsp;&nbsp;
                <button className="au-btn" onClick={this.next}> Next </button>
          </li>
          </div>
        )
    }
}

/*
const mapStateToProps = (state) => {
    return {
        progressNo: state.progressNo,
    }
}


export default connect(mapStateToProps)(Content);
*/
