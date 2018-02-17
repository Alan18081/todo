import * as actionTypes from './actionTypes';
import axios from '../../axios/axios.auth';
import config from '../../config';

export const saveUserInfo = (field,value,token) => {
  return dispatch => {
    const updatedUserInfo = {
      idToken: token,
      [field === 'name'
        ? 'displayName'
        : field === 'image' ? 'photoUrl' : field]:value,
      returnSecureToken: false
    };
    axios.post(config.changeRegInfo,updatedUserInfo)
      .then(response => {
        dispatch({
          type: actionTypes.SAVE_USER_INFO,
          field,
          value
        });
      })
  }
};

const getUserInfoSuccess = (userInfo) => {
  return {
    type: actionTypes.GET_USER_INFO_SUCCESS,
    userInfo
  }
};

const getUserInfoStart = () => {
  return {
    type: actionTypes.GET_USER_INFO_START
  }
};

const getUserInfoFailed = (error) => {
  return {
    type: actionTypes.GET_USER_INFO_FAILED,
    error
  }
};

export const getUserInfo = (token) => {
  return dispatch => {
    dispatch(getUserInfoStart());
    axios.post(config.getUserInfo,{
      idToken: token
    })
      .then(response => {
        const userInfo = {
          name: response.data.users[0].displayName,
          email: response.data.users[0].email,
          emailVerified: response.data.users[0].emailVerified,
          image: response.data.users[0].photoUrl
        };
        dispatch(getUserInfoSuccess(userInfo));
      })
      .catch(() => {
        dispatch(getUserInfoFailed('Error with loading your user data. Please, try to login again'))
      });
  }
};

const sendVerificationCodeSuccess = () => {
  return {
    type: actionTypes.SEND_VERIFICATION_SUCCESS
  }
};

const sendVerificationCodeFailed = (error) => {
  return {
    type: actionTypes.SEND_VERIFICATION_FAILED,
    error
  }
};

export const sendVerificationCode = (token) => {
  return dispatch => {
    axios.post(config.verifyEmail,{
      requestType: 'VERIFY_EMAIL',
      idToken: token
    })
      .then(() => {
        dispatch(sendVerificationCodeSuccess())
      })
      .catch(() => {
        dispatch(sendVerificationCodeFailed('Server error. Try to change password later'))
      });
  };
};

const changePasswordSuccess = () => {
  return {
    type: actionTypes.CHANGE_PASSWORD_SUCCESS
  }
};

const changePasswordFailed = (error) => {
  return {
    type: actionTypes.CHANGE_PASSWORD_FAILED,
    error
  }
};

export const changePassword = (token,password) => {
  return dispatch => {
    axios.post(config.changeRegInfo,{
      idToken: token,
      password,
      returnSecureToken: false
    })
      .then(() => {
        dispatch(changePasswordSuccess())
      })
      .catch(error => {
        dispatch(changePasswordFailed('Server error. Try to change password later'))
      });
  };
};
