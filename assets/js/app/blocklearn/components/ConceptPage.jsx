import {connect} from 'react-redux';
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

class ConceptPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //const { match: { params } } = this.props;
    //console.log(this.props.match.params);
    }

  render(){
    console.log(this.props.match.params.userId);
    return(
    <div>deneme</div>
  )
  }
}

const conceptPage = ({ match, location }) => {
  return (
    <>
      <p>
        <strong>Match Props: </strong>
        <code>{JSON.stringify(match, null, 2)}</code>
      </p>
      <p>
        <strong>Location Props: </strong>
        <code>{JSON.stringify(location, null, 2)}</code>
      </p>
    </>
  );
};

export default withRouter(ConceptPage)
