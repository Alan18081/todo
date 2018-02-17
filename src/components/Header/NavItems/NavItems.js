import React from 'react';

import classes from './NavItems.sass';
import NavItem from './NavItem/NavItem';

import TasksIcon from '../../../assets/icons/list.svg';
import UserIcon from '../../../assets/icons/user.svg';
import LogoutIcon from '../../../assets/icons/logout.svg';


const navItems = props => (
  <ul className={classes.NavItems}>
    <NavItem  link="/tasks">
      <TasksIcon/>
      Tasks
    </NavItem>
    <NavItem link="/profile">
      {props.image
        ? <img src={props.image} alt="User avatar"/>
        : <UserIcon className={classes.UserInfo__icon}/>}
      <span>{props.username}</span>
    </NavItem>
    <NavItem link="/logout">
      <LogoutIcon/>
    </NavItem>
  </ul>
);

export default navItems;