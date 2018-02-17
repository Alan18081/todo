import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import classes from './Layout.sass';

import * as actions from '../../store/actions/index';
import Wrap from '../../hoc/Wrap/Wrap';
import Header from '../../components/Header/Header';
import Spinner from '../../components/UI/Spinner/Spinner';

import LogoutIcon from '../../assets/icons/logout.svg'

class Layout extends Component {
  componentDidMount() {
    this.props.onGetUserInfo(this.props.token);
  }
  logoutHandler = () => {
    this.props.history.push('/logout');
  };
  render() {
    let content = (
      <div className={classes.Layout}>
        <Header
          image={this.props.image}
          clicked={this.logoutHandler}
          username={this.props.name}
        />
        <main className={classes.Layout__content}>
          <Wrap>
            {this.props.children}
          </Wrap>
        </main>
      </div>
    );
    if(this.props.error) {
      console.log('Error');
      content = (
        <div>
          <h1 className={classes.Layout__error}>{this.props.error}</h1>
          <button
            className={classes.Layout__btn}
            onClick={this.logoutHandler}
          >
            <LogoutIcon/>
          </button>
        </div>
      )
    }
    return this.props.loading ? <Spinner/> : content
  }
}

const mapStateToProps = state => {
  return {
    name: state.profile.name,
    token: state.auth.token,
    image: state.profile.image,
    error: state.profile.getUserInfoError,
    loading: state.profile.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onGetUserInfo: (token) => dispatch(actions.getUserInfo(token))
  }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Layout));