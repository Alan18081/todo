import React from 'react';

import classes from './Task.sass';

import EditIcon from '../../../assets/icons/edit.svg';
import RemoveIcon from '../../../assets/icons/rubbish-bin.svg';
import CheckedIcon from '../../../assets/icons/tick.svg';

const tasks = props => {
  let btnCheck = <button className={classes.Task__completed} onClick={props.completedHandler}>Complete</button>;
  if(props.completed) {
    btnCheck = (
      <button onClick={props.completedHandler} className={classes.Task__completed}>
        <CheckedIcon/> Completed
      </button>
    );
  }
  const cssClasses = [classes.Task,
    props.completed ? classes.Task_completed :
    props.editing ? classes.Task_editing : null
  ];
  return (

      <li className={cssClasses.join(' ')}>
        <div className={classes.Task__container}>
          <div className={classes.Task__info}>
            {props.editing
              ? <input onChange={(event) => props.editHandler(event,'title')} className={classes.Task__input} type="text" value={props.title}/>
              : <h2  className={classes.Task__title}>{props.title}</h2>}
            {props.editing
              ? <textarea className={classes.Task__textarea} value={props.description} onChange={(event) => props.editHandler(event,'description')} cols="30" rows="3"></textarea>
              : <p className={classes.Task__description}>{props.description}</p>}
            <div className={classes.Task__date}>{props.date}</div>
          </div>
          <ul className={classes['Task-controls']}>
            <li className={classes['Task-controls__item']}>
              {props.editing
                ? <button
                  className={props.editing ? classes['Task-controls__edit'] + ' ' + classes['Task-controls__edit_active'] : classes['Task-controls__edit']}
                  onClick={props.offToggleEdit}>
                  <CheckedIcon/>
                </button>
                : <button
                  className={props.editing ? classes['Task-controls__edit'] + ' ' + classes['Task-controls__edit_active'] : classes['Task-controls__edit']}
                  onClick={props.onToggleEdit}>
                  <EditIcon/>
                </button>
              }
            </li>
            <li className={classes['Task-controls__item']} onClick={props.removed}>
              <button className={classes['Task-controls__remove']}>
                <RemoveIcon/>
              </button>
            </li>
          </ul>
        </div>
        {btnCheck}
      </li>
  );
};

export default tasks;