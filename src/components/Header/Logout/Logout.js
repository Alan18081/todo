import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';

class Logout extends Component {
  componentWillMount() {
    this.props.onLogout();
  }
  render() {
    return (
      <Redirect to="/auth"/>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
};

export default connect(null,mapDispatchToProps)(Logout);