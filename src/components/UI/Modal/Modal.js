import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import Asx from '../../../hoc/Asx/Asx';
import classes from './Modal.sass';

const modal = props => (
  <Asx>
    {props.shown ? <div className={classes.Modal__backdrop} onClick={props.closed}></div> : null}
    <CSSTransition
      timeout={5000}
      in={props.shown}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: '',
        enterActive: classes.Modal_shown,
        exit: '',
        exitActive: classes.Modal_hidden
      }}
    >
      <div className={classes.Modal__window}>
        {props.children}
      </div>
    </CSSTransition>
  </Asx>
);
export default modal;