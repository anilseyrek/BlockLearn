import React from 'react';

const NotFound = () => {
  let styles = {
        width: '200px',
        height: '600px',

        position:'absolute',
        left:'0', right:'0',
        top:'128px',
        margin:'auto',

        /*this to solve "the content will not be cut when the window is smaller than the content":
        maxWidth:'100%'',
        maxHeight:'100%'',*/
        overflow:'auto'
  };
    return (

<div className="page-wrapper">
    <aside className="menu-sidebar2">
        <div className="logo">
            <a href="#">
                <img src={"/static/images/icon/logo-white.png"} alt="BlockLearn" />
            </a>
        </div>
        </aside>
          <header className="header-desktop2">
              <div className="section__content section__content--p30">
                  <div className="container-fluid">
                      <div className="header-wrap2">
                          <div className="logo d-block d-lg-none">
                              <a href="#">
                                  <img src={"/static/images/icon/logo-white.png"} alt="BlockLearn" />
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          </header>
                <div className="section__content section__content" style={styles}>
                  <h2>Not Found</h2>
                  <p>The page you're looking for does not exists.</p>

                </div>
        </div>

    )
}

export default NotFound
