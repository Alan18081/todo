import * as actionTypes from '../actions/actionTypes';

const initialState = {
 name: '',
 email: '',
 emailVerified: false,
 image: '',
 loading: false,
 sentVerificationCode: false,
 sendVerificationError: null,
 changePasswordError: null,
 getUserInfoError: null
};

const saveUserInfo = (state,action) => {
  return {
    ...state,
    [action.field]: action.value
  }
};

const getUserInfoStart = (state) => {
  return {
    ...state,
    loading: true
  }
};

const getUserInfoSuccess = (state,action) => {
  return {
    ...state,
    ...action.userInfo,
    loading: false
  }
};

const getUserInfoFailed = (state,action) => {
  return {
    ...state,
    getUserInfoError: action.error,
    loading: false
  }
};

const sendVerificationSuccess = (state) => {
  return {
    ...state,
    sentVerificationCode: true
  }
};

const sendVerificationFailed = (state,action) => {
  return {
    ...state,
    sendVerificationError: action.error
  }
};


const changePasswordSuccess = (state) => {
  return {
    ...state,
    passwordChanged: true
  }
};

const changePasswordFailed = (state,action) => {
  return {
    ...state,
    changePasswordError: action.error
  }
};

const reducer = (state = initialState,action) => {
  switch(action.type) {
    case actionTypes.SAVE_USER_INFO:
      return saveUserInfo(state,action);
    case actionTypes.GET_USER_INFO_START:
      return getUserInfoStart(state);
    case actionTypes.GET_USER_INFO_SUCCESS:
      return getUserInfoSuccess(state,action);
    case actionTypes.GET_USER_INFO_FAILED:
      return getUserInfoFailed(state,action);
    case actionTypes.SEND_VERIFICATION_SUCCESS:
      return sendVerificationSuccess(state);
    case actionTypes.SEND_VERIFICATION_FAILED:
      return sendVerificationFailed(state,action);
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      return changePasswordSuccess(state);
    case actionTypes.CHANGE_PASSWORD_FAILED:
      return changePasswordFailed(state,action);
    default:
      return state;
  }
};

export default reducer;