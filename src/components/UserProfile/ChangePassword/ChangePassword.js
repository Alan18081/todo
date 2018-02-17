import React from 'react';

import classes from './ChangePassword.sass';

import Button from '../../UI/Button/Button';

import KeyIcon from '../../../assets/icons/key.svg'

const changePassword = props => {
  return (
    <div className={classes.ChangePassword}>
      <h3 className={classes.ChangePassword__title}>
        <KeyIcon/>
        Changing password
      </h3>
      <form
        onSubmit={props.submit}
        className={classes.ChangePassword__form}>
        {props.children}
        {props.error ? <p className={classes.ChangePassword__error}>{props.error}</p> : null}
        <Button
          disabled={!props.btnActive}
          className={classes.ChangePassword__btn}
        >Save new password</Button>
      </form>
    </div>
  );
};

export default changePassword;