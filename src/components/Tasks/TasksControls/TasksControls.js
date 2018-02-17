import React from 'react';

import classes from './TasksControls.sass';
import PlusIcon from '../../../assets/icons/plus.svg';

const tasksControls = props => (
  <div className={classes.TasksControls}>
    <button className={classes.TasksControls__btn} onClick={props.clicked}>
      <PlusIcon/>
      Add task
    </button>
    <div className={classes.TasksControls__info}>
      <span className={classes.TasksControls__completed + ' ' + classes.TasksControls__quantity}>{props.completedLength} completed</span>/
      <span className={classes.TasksControls__quantity}>{props.tasksLength} tasks</span>
    </div>
  </div>
);

export default tasksControls;