import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './AuthForm.sass';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

const authForm = props => {
  const formControlsArray = [];
  for(let key in props.controls) {
    formControlsArray.push({
      id: key,
      ...props.controls[key]
    })
  }
  return (
    <div className={classes.AuthForm}>
      <h1 className={classes.AuthForm__title}>{props.title}</h1>
      <form onSubmit={props.submit} className={classes.AuthForm__form}>
        {formControlsArray.map(formElem => (
          <Input
            className={classes.AuthForm__input}
            key={formElem.id}
            touched={formElem.touched}
            valid={formElem.valid}
            elemType={formElem.elemType}
            config={formElem.elemConfig}
            errorMessage={formElem.errorMessage}
            changed={(event) => props.changed(props.type,event.target.value,formElem.id)}
            value={formElem.value}
          />
        ))}
        {props.error ? <p className={classes.AuthForm__error}>{props.error.replace(/_/g,' ')}</p> : null}
        {props.sentCode ? <p className={classes.AuthForm__message}>Code is successfully sent. Check your email for code</p> : null}
        <Button disabled={!props.formIsValid}>{props.btn}</Button>
        {props.links.map(link => (
          <NavLink
            key={link.caption}
            className={classes.AuthForm__link}
            to={link.path}
          >
            {link.caption}
          </NavLink>
        ))}
      </form>
    </div>
  );
};

export default authForm;