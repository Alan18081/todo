import React from 'react';

import classes from './Input.sass';

const input = props => {
  const cssDivClasses = [classes.Input,props.className];
  let inputElem;
  let cssClasses = [classes.Input__field];
  if(!props.valid && props.touched)
    cssClasses.push(classes.Input__field_invalid)
  switch (props.elemType) {
    case 'input':
      inputElem = <input {...props.config} className={cssClasses.join(' ')} onChange={props.changed} value={props.value}/>;
      break;
    case 'textarea':
      inputElem = <textarea cols="30" rows="10" {...props.config} className={cssClasses.join(' ')} onChange={props.changed} value={props.value}></textarea>;
      break;
    default:
      inputElem = <input {...props.config} className={cssClasses.join(' ')} onChange={props.changed} value={props.value}/>
  }
  return (
    <div className={cssDivClasses.join(' ')}>
      {inputElem}
      <p className={classes.Input__message}>{props.errorMessage}</p>
    </div>
  );
};

export default input;