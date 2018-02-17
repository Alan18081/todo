import React from 'react';

import classes from './UserAvatar.sass';

import Asx from '../../../hoc/Asx/Asx';
import Button from '../../UI/Button/Button';
import noUserImageImg from '../../../assets/img/no_user_image.jpg';
import Input from '../../UI/Input/Input';

const userAvatar = props => {
  const userImage = props.image || noUserImageImg;
  const formImage = (
    <Asx>
      <div
        onClick={props.showImageInput}
        className={classes.UserAvatar__bg}
      ></div>
      <form
        onSubmit={props.upload} className={classes.UserAvatar__form}
      >
        <Input
          touched={props.config.touched}
          valid={props.config.valid}
          elemType={props.config.elemType}
          config={props.config.elemConfig}
          errorMessage={props.config.errorMessage}
          changed={(event) => props.changedPath(event.target.value)}
        />
        <Button disabled={!props.isValid}>Upload new avatar</Button>
      </form>
    </Asx>
  );
  return (
    <div className={classes.UserAvatar}>
      <img className={classes.UserAvatar__img} src={userImage} alt="User Avatar"/>
      {!props.shown ? <Button
        type="shadow"
        className={classes.UserAvatar__btn}
        clicked={props.showImageInput}
      >
        Change avatar
      </Button> : null}
      {props.shown
        ? formImage
        : null
      }
    </div>
  )
};

export default userAvatar;