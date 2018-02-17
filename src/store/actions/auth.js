import * as actionTypes from './actionTypes';
import axios from '../../axios/axios.auth';
import config from '../../config';
import pureAxios from 'axios';

let timeout;

const authSuccess = (token,userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expires');
  localStorage.removeItem('refreshToken');
  return {
    type: actionTypes.LOGOUT
  }
};

const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error
  }
};

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const auth = (userInfo,login) => {
  console.log(userInfo);
  return dispatch => {
    dispatch(authStart());
    axios.post(config.auth,userInfo)
      .then(response => {
        const expiresTime = new Date().getTime() + Number(response.data.expiresIn) * 1000;
        const token = response.data.idToken;
        const userId = response.data.localId;
        localStorage.setItem('token',token);
        localStorage.setItem('userId',userId);
        localStorage.setItem('expires',expiresTime);
        localStorage.setItem('refreshToken',response.data.refreshToken);
        axios.post(config.changeRegInfo,{
          idToken: response.data.idToken,
          displayName: login,
          photoUrl: '',
          returnSecureToken: true
        })
          .then(response => {
            dispatch(authSuccess(token,userId));
          })
          .catch(error => {
            dispatch(authFailed(error.response.data.error));
          });
      })
      .catch(error => {
        dispatch(authFailed(error.response.data.error.message));
      });
  }
};

const loginSuccess = (token,userId) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token,
    userId
  }
};

const loginFailed = (error) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    error
  }
};

const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  }
};

const checkExpiresTime = (expiresTime) => {
  return dispatch => {
    if(timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      console.log('Inside timeout')
      dispatch(logout());
    },expiresTime);
  }
};

export const login = (userInfo) => {
  return dispatch => {
    dispatch(loginStart());
    axios.post(config.login,userInfo)
      .then(response => {
        console.log(response);
        const expiresTime = new Date().getTime() + Number(response.data.expiresIn) * 1000;
        localStorage.setItem('token',response.data.idToken);
        localStorage.setItem('userId',response.data.localId);
        localStorage.setItem('expires',expiresTime);
        localStorage.setItem('refreshToken',response.data.refreshToken);
        dispatch(loginSuccess(response.data.idToken,response.data.localId));
        dispatch(checkExpiresTime(response.data.expiresIn * 1000));
      })
      .catch(error => {
        console.log(error.message);
        dispatch(loginFailed(error.response.data.error.message));
      });
  };
};

export const autoSignIn = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if(!token) {
      dispatch(logout());
    }
    else {
      const expiresTime = localStorage.getItem('expires');
      if(expiresTime < new Date().getTime()) {
        dispatch(logout());
      }
      else {
        const userId = localStorage.getItem('userId');
        dispatch(loginSuccess(token,userId));
        dispatch(checkExpiresTime(expiresTime - new Date().getTime()));
      }
    }
  }
};

const refreshUserTokenSuccess = (token,userId,expiresIn) => {
  const expiresTime = new Date().getTime() + Number(expiresIn) * 1000;
  localStorage.setItem('token',token);
  localStorage.setItem('userId',userId);
  localStorage.setItem('expires',expiresTime);
  return {
    type: actionTypes.REFRESH_USER_TOKEN_SUCCESS,
    token,
    userId,
    expiresIn
  }
};

export const refreshUserToken = () => {
  return dispatch => {
    refreshTokenHandler(dispatch);
  }
};

const refreshTokenHandler = (dispatch) => {
  pureAxios.post(config.refreshToken,{
    grant_type: 'refresh_token',
    refresh_token: localStorage.getItem('refreshToken')
  })
    .then(response => {
      const expiresIn = response.data.expires_in;
      const token = response.data.id_token;
      const userId = response.data.user_id;
      dispatch(refreshUserTokenSuccess(token,userId,expiresIn));
      dispatch(checkExpiresTime(expiresIn * 1000));
    })
};

const autoRefreshTokenSuccess = () => {
  return {
    type: actionTypes.AUTO_REFRESH_TOKEN_SUCCESS
  }
};

export const autoRefreshToken = () => {
  const expiresTime = localStorage.getItem('expires') - new Date().getTime();
  return dispatch => {
    dispatch(autoRefreshTokenSuccess());
    setTimeout(() => {
      refreshTokenHandler(dispatch)
    },expiresTime - 60000);
  }
};

export const switchForm = () => {
  return {
    type: actionTypes.SWITCH_FORM
  }
};

const deleteAccountFailed = (error) => {
  return {
    type: actionTypes.DELETE_ACCOUNT_FAILED,
    error
  }
};

export const deleteAccount = () => {
  return dispatch => {
    axios.post(config.deleteAccount,{
      idToken: localStorage.getItem('token')
    })
      .then(() => {
        dispatch(logout());
      })
      .catch(error => {
        dispatch(deleteAccountFailed('Server error. Please, try to delete account later'));
      })
  }
};

const sendResetPasswordStart = () => {
  return {
    type: actionTypes.SEND_RESET_PASSWORD_START
  }
};

const sendResetPasswordSuccess = () => {
  return {
    type: actionTypes.SEND_RESET_PASSWORD_SUCCESS
  }
};

const sendResetPasswordFailed = (error) => {
  return {
    type: actionTypes.SEND_RESET_PASSWORD_FAILED,
    error
  }
};

export const sendResetPassword = (userInfo) => {
  return dispatch => {
    dispatch(sendResetPasswordStart());
    axios.post(config.verifyEmail,userInfo)
      .then(() => {
        dispatch(sendResetPasswordSuccess())
      })
      .catch(() => {
        dispatch(sendResetPasswordFailed('Server error. Try to reset password again'))
      });
  };
};