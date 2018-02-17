import React from 'react';

import classes from './DeleteAccount.sass';

import DeleteIcon from '../../../assets/icons/delete-cross.svg';
import Modal from '../../UI/Modal/Modal';

const deleteAccount = props => (
  <div className={classes.DeleteAccount}>
    <button
      onClick={props.clicked}
      className={classes.DeleteAccount__btn}>
      <DeleteIcon/>
      Delete account
    </button>
    <div className={classes.DeleteAccount__warning}>Warning: you could not reinstate account</div>
    {props.error
      ? <div className={classes.DeleteAccount__error}>
        Your credential are too old. Please, login and try again
      </div>:null}
    <Modal shown={props.shown} closed={props.clicked}>
      <div className={classes.DeleteDialog}>
        <h1 className={classes.DeleteDialog__title}>Are you sure, you want to delete your account?</h1>
        <div className={classes.DeleteDialog__warning}>Warning: you could not reinstate account</div>
        <div className={classes.DeleteDialog__btns}>
          <button
            className={classes.DeleteDialog__btn + ' ' + classes.DeleteDialog__btn_red}
            onClick={props.deleteAccount}
          >
            Yes
          </button>
          <button
            onClick={props.clicked}
            className={classes.DeleteDialog__btn}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  </div>
);

export default deleteAccount;