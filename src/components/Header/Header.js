import React from 'react';

import classes from './Header.sass';

import Wrap from '../../hoc/Wrap/Wrap';
import Logo from './Logo/Logo';
import NavItems from './NavItems/NavItems';

const header = props => (
  <header className={classes.Header}>
    <Wrap>
      <div className={classes.Header__content}>
        <Logo/>
        <NavItems image={props.image} username={props.username}/>
      </div>
    </Wrap>
  </header>
);

export default header;