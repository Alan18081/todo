import React from 'react';

import classes from './Logo.sass';

const logo = props => {
  const cssClasses = [classes.Logo,props.className];
  return (
    <div className={cssClasses.join(' ')}>
      MagicTasks
    </div>
  )
};

export default logo;