import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import './App.sass';
import {Route,Switch,Redirect,withRouter} from 'react-router-dom';

import Tasks from '../../components/Tasks/Tasks';
import Auth from '../../containers/Auth/Auth';
import UserProfile from '../../containers/UserProfile/UserProfile';
import Logout from '../../components/Header/Logout/Logout';

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignIn();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Redirect to="/auth"/>
      </Switch>
    );
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/tasks" component={Tasks}/>
          <Route path="/profile" component={UserProfile}/>
          <Route path="/logout" component={Logout}/>
        </Switch>
      )
    }
    return routes;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: () => dispatch(actions.autoSignIn())
  }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
