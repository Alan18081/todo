import React from 'react';

import classes from './VerifyEmail.sass';
import Button from '../../../components/UI/Button/Button';
import Asx from '../../../hoc/Asx/Asx';
import MailIcon from '../../../assets/icons/mail.svg';

const verifyEmail  = props => {
  let content = (
    <Asx>
      <Button
        clicked={props.sendCodeHandler}
        className={classes.VerifyEmail__btn}
      >
        Send verification code
      </Button>
      {props.error ? <p className={classes.VerifyEmail__error}>{props.error}</p> : null}
    </Asx>
  );
  if(props.sentCode) {
    content = <p>Message has been sent to your email address</p>;
  }
  return (
    <div className={classes.VerifyEmail}>
      <h3 className={classes.VerifyEmail__title}>
        <MailIcon/>
        Email verification
      </h3>
      {content}
    </div>
  );
};

export default verifyEmail;