import React from 'react';

import classes from './Wrap.sass';

const wrap = props => (
  <div className={classes.Wrap}>
    {props.children}
  </div>
);

export default wrap;