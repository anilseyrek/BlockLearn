// Breadcrumb.js
import React, {Component} from 'react';


 class Breadcrumb extends Component {
   /*
      var button = document.querySelector('#container .button');
      button.addEventListener('click', fullscreen);
      // when you are in fullscreen, ESC and F11 may not be trigger by keydown listener.
      // so don't use it to detect exit fullscreen
      document.addEventListener('keydown', function (e) {
       console.log('key press' + e.keyCode);
      });
      // detect enter or exit fullscreen mode
      document.addEventListener('webkitfullscreenchange', fullscreenChange);
      document.addEventListener('mozfullscreenchange', fullscreenChange);
      document.addEventListener('fullscreenchange', fullscreenChange);
      document.addEventListener('MSFullscreenChange', fullscreenChange);
*/
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
                                  <span className="au-breadcrumb-span">You are here:</span>
                                  <ul className="list-unstyled list-inline au-breadcrumb__list">
                                      <li className="list-inline-item active">
                                          <a href="#">Home</a>
                                      </li>
                                      <li className="list-inline-item seprate">
                                          <span>/</span>
                                      </li>
                                      <li className="list-inline-item">Courses</li>
                                      <li className="list-inline-item seprate">
                                          <span>/</span>
                                      </li>
                                      <li className="list-inline-item">Introduction to Blockchain</li>
                                  </ul>
                              </div>
                              <div className="au-breadcrumb-right">
                                <button className="au-btn" id="save-progress">Save My Progress</button>&nbsp;
                                <button className="au-btn" id="fullscreen-button" onClick={this.fullscreen}>Fullscreen</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </section>
        )
    }
}

export default Breadcrumb;
