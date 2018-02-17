import React from 'react';

import classes from './UserDataItem.sass';

import EditIcon from '../../../../assets/icons/edit.svg';
import CheckedIcon from '../../../../assets/icons/tick.svg';

import Input from '../../../UI/Input/Input';

const userDataItem = props => {
  const cssClasses = [classes.UserDataItem,
    props.big ? classes.UserDataItem_big : null,
    props.editing ? classes.UserDataItem_editing : null
  ];
  return (
    <div className={cssClasses.join(' ')}>
      {props.editing
        ? <Input
          className={classes.UserDataItem__input}
          errorMessage={props.errorMessage}
          value={props.children}
          changed={props.onInput}
        />
        : <h2 className={classes.UserDataItem__caption}>{props.children}</h2>
      }
      <button
        className={classes.UserDataItem__btn}
        onClick={props.editing ? props.offEdit : props.onEdit}
      >
        {props.editing
          ? <CheckedIcon className={classes.UserDataItem__icon_editing}/>
          : <EditIcon/>
        }
      </button>
    </div>
  );
};

export default userDataItem;