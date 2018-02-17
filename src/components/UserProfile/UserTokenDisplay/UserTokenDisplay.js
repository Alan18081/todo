import React, {Component} from 'react';

import {convertTime} from '../../../helpers/helpers';

import classes from './UserTokenDisplay.sass';

import Button from '../../UI/Button/Button';
import RefreshIcon from '../../../assets/icons/reload.svg';

class UserTokenDisplay extends Component {
  state = {
    time: convertTime(this.props.time)
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: convertTime(this.props.time)
      })
    },1000);
  }
  render() {
    return (
      <div className={classes.UserTokenDisplay}>
        <div className={classes.UserTokenDisplay__info}>
          Your token will expire in
          <div className={classes.UserTokenDisplay__time}>{this.state.time
          }</div>
        </div>
        <Button type="ghost" clicked={this.props.clicked}>
          <RefreshIcon className={classes.UserTokenDisplay__refreshIcon}/>
          Refresh token
        </Button>
      </div>
    );
  }
};

export default UserTokenDisplay;