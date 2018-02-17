import React from 'react';

import classes from './Button.sass';

const button = props => {
  const cssClasses = [classes.Button,
    props.type === 'filled' ? classes.Button_filled
    : props.type === 'shadow' ? classes.Button_shadow
    : props.type === 'ghost' ? classes.Button_ghost
    : classes.Button_filled,
    props.className
  ];
  return (
    <button
      disabled={props.disabled}
      className={cssClasses.join(' ')}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default button;