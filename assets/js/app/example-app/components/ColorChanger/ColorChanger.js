import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Sidebar2 from '../Sidebar2';

import ColorDisplay from '../ColorDisplay';

import './style.scss';


class ColorChanger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: 'black',
    };

    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  handleChangeColor(e) {
    const color = e.target.value;
    this.setState({ color });
  }

  render() {
    const { title } = this.props;

    return (
      <div>
      <div className="page-wrapper">
          <Sidebar2 />
      </div>
      <div className="page-container2">

              <Header />
              <Sidebar />
      </div>
      </div>
    );
  }
}

ColorChanger.defaultProps = {
  title: 'React App Loaded!',
};

ColorChanger.propTypes = {
  title: PropTypes.string,
};

export default hot(module)(ColorChanger);
