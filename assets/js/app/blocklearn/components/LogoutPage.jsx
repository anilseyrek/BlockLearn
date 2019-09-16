import { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {auth} from "../actions";

class LogoutPage extends Component {

  componentWillMount() {
    this.props.dispatch(auth.logout())
  }

  render() {
    return null
  }
}
LogoutPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default withRouter(connect()(LogoutPage))
