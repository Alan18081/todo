import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavItem.sass';

const navItem = props => (
  <li className={classes.NavItem}>
    <NavLink className={classes.NavItem__link} activeClassName={classes.NavItem_active} to={props.link}>
      {props.children}
    </NavLink>
  </li>
);

export default navItem;