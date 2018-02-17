import React from 'react';

import classes from './UserData.sass';
import UserDataItem from './UserDataItem/UserDataItem';

const userData = props => {
  const userInfoControls = [];
  for(let key in props.config.controls) {
    userInfoControls.push({
      key,
      ...props.config.controls[key]
    })
  }
  return (
    <div className={classes.UserData}>
      {userInfoControls.map((infoElem) => (
        <UserDataItem
          key={infoElem.key}
          big={infoElem.big}
          editing={infoElem.editing}
          onInput={(event) => props.onInput('userInfo',infoElem.key,event.target.value)}
          onEdit={() => props.onEdit(infoElem.key)}
          offEdit={() => props.offEdit(infoElem.key)}
          errorMessage={infoElem.errorMessage}
        >{infoElem.touched ? infoElem.value : props.value[infoElem.key]}</UserDataItem>
        ))}
    </div>
  );
};

export default userData;