import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  isAuthenticated: false,
  token: null,
  userId: null,
  authError: null,
  loginError: null,
  resetPasswordError: null,
  sentResetCode: false,
  refreshToken: null,
  autoRefresh: false,
  deleteAccountError: null
};

const authSuccess = (state,action) => {
  return {
    ...state,
    token: action.token,
    userId: action.userId,
    loading: false,
    isAuthenticated: true
  }
};

const authStart = (state) => {
  return {
    ...state,
    loading: true
  }
};

const authFailed = (state,action) => {
  return {
    ...state,
    loading: false,
    authError: action.error
  }
};

const loginStart = (state) => {
  return {
    ...state,
    loading: true
  }
};

const loginSuccess = (state,action) => {
  return {
    ...state,
    token: action.token,
    userId: action.userId,
    isAuthenticated: true,
    loading: false
  }
};

const loginFailed = (state,action) => {
  return {
    ...state,
    loading: false,
    loginError: action.error
  }
};

const logout = (state) => {
  return {
    ...state,
    token: null,
    isAuthenticated: false,
    userId: null,
    refreshToken: null
  }
};

const refreshUserTokenSuccess = (state,action) => {
  return {
    ...state,
    token: action.token,
    userId: action.userId,
    expires: action.expiresIn
  }
};

const autoRefreshToken = (state) => {
  return {
    ...state,
    autoRefresh: !state.autoRefresh
  }
};

const deleteAccountFailed = (state,action) => {
  return {
    ...state,
    deleteAccountError: action.error
  }
};

const switchForm = (state) => {
  return {
    ...state,
    authError: null
  }
};

const sendResetPasswordStart = (state) => {
  return {
    ...state,
    loading: true
  }
};

const sendResetPasswordSuccess = (state) => {
  return {
    ...state,
    loading: false,
    sentResetCode: true
  }
};

const sendResetPasswordFailed = (state,action) => {
  return {
    ...state,
    loading: false,
    authError: action.error
  }
};

const reducer = (state = initialState,action) => {
  switch(action.type) {
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state,action);
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_FAILED:
      return authFailed(state,action);
    case actionTypes.LOGIN_START:
      return loginStart(state);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state,action);
    case actionTypes.LOGIN_FAILED:
      return loginFailed(state,action);
    case actionTypes.LOGOUT:
      return logout(state);
    case actionTypes.REFRESH_USER_TOKEN_SUCCESS:
      return refreshUserTokenSuccess(state,action);
    case actionTypes.AUTO_REFRESH_TOKEN_SUCCESS:
      return autoRefreshToken(state);
    case actionTypes.DELETE_ACCOUNT_FAILED:
      return deleteAccountFailed(state,action);
    case actionTypes.SWITCH_FORM:
      return switchForm(state);
    case actionTypes.SEND_RESET_PASSWORD_START:
      return sendResetPasswordStart(state);
    case actionTypes.SEND_RESET_PASSWORD_SUCCESS:
      return sendResetPasswordSuccess(state);
    case actionTypes.SEND_RESET_PASSWORD_FAILED:
      return sendResetPasswordFailed(state,action);
    default:
      return state;
  }
};

export default reducer;