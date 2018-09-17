import { replace } from 'react-router-redux';

import { signup, login, confirmEmail, user } from './api';
import { fetchApi, getErrorMessage } from '../../helpers';
import { setProfile, clearProfile } from '../ProfileContainer/profile.duck';

// action-types
const REQUEST_AUTH = 'AUTH_REQUEST_AUTH';
const RECEIVE_AUTH = 'AUTH_RECEIVE_AUTH';
const LOGOUT = 'AUTH_LOGOUT';
const SET_NOTIFICATION = 'AUTH_SET_NOTIFICATION';
const REQUEST_CONFIRMATION = 'AUTH_REQUEST_CONFIRMATION';

// reducer
const authReducer = (
  state = {
    isAuthorizing: false,
    isConfirming: false,
    token: localStorage.getItem('token'),
    isLoggedIn: localStorage.getItem('token') !== null,
    notification: {
      type: 'success',
      message: null
    }
  },
  action
) => {
  switch (action.type) {
    case REQUEST_AUTH:
      return Object.assign({}, state, {
        isAuthorizing: action.isAuthorizing
      });
    case RECEIVE_AUTH:
      return Object.assign({}, state, {
        token: action.token,
        isLoggedIn: true
      });
    case LOGOUT:
      localStorage.clear();
      return Object.assign({}, state, {
        token: null,
        isLoggedIn: false
      });
    case SET_NOTIFICATION:
      return Object.assign({}, state, {
        notification: {
          type: action.messageType,
          message: action.message
        }
      });
    case REQUEST_CONFIRMATION:
      return Object.assign({}, state, {
        isConfirming: action.isConfirming
      });
    default:
      return state;
  }
};

// actions
const requestAuth = isAuthorizing => ({
  type: REQUEST_AUTH,
  isAuthorizing
});

const requestConfirmation = isConfirming => ({
  type: REQUEST_CONFIRMATION,
  isConfirming
});

const recieveLogin = (token) => {
  localStorage.setItem('token', token);
  return {
    type: RECEIVE_AUTH,
    token,
  }
};

export const setNotification = (messageType, message) => ({
  type: SET_NOTIFICATION,
  messageType,
  message
});

export const clearMessages = () => dispatch => dispatch(setNotification('success', null));

export const logout = () => (dispatch) => {
  dispatch(clearProfile());
  dispatch({ type: LOGOUT });
}

export const registerUser = payload => (dispatch) => {
  dispatch(requestAuth(true));
  fetchApi(signup, [payload])
    .then(() => {
      dispatch(requestAuth(false));
      dispatch(setNotification('success', 'An email has been sent for account confirmation!'));
    })
    .catch(e => {
      e.text().then(response => {
        let errorMessage = JSON.parse(response);
        errorMessage = getErrorMessage(errorMessage.error);
        dispatch(setNotification('error', errorMessage));
      });
      dispatch(requestAuth(false));
    });
}

export const loginUser = payload => (dispatch) => {
  dispatch(requestAuth(true));
  fetchApi(login, [payload])
    .then(res => {
      dispatch(setProfile(res.profile));
      dispatch(recieveLogin(res.token));
      dispatch(requestAuth(false));
    })
    .catch(e => {
      e.text().then(response => {
        let errorMessage = JSON.parse(response);
        errorMessage = getErrorMessage(errorMessage.error);
        dispatch(setNotification('error', errorMessage));
      });
      dispatch(requestAuth(false));
    });
}

export const confirmAndLoginUser = id => (dispatch) => {
  dispatch(requestConfirmation(true));
  dispatch(replace('/login'));
  fetchApi(confirmEmail, [id])
    .then(res => {
      dispatch(setProfile(res.profile));
      dispatch(recieveLogin(res.token));
      dispatch(requestConfirmation(false));
    })
    .catch(e => {
      e.text().then(response => {
        let errorMessage = JSON.parse(response);
        errorMessage = getErrorMessage(errorMessage.error);
        dispatch(setNotification('error', errorMessage));
      });
      dispatch(requestConfirmation(false));
    });
}

export const returnUser = token => (dispatch) => {
  dispatch(requestConfirmation(true));
  dispatch(replace('/login'));
  fetchApi(user, [token])
    .then(res => {
      dispatch(setProfile(res.profile));
      dispatch(recieveLogin(res.token));
      dispatch(requestConfirmation(false));
    })
    .catch(e => {
      e.text().then(response => {
        let errorMessage = JSON.parse(response);
        errorMessage = getErrorMessage(errorMessage.error);
        dispatch(setNotification('error', errorMessage));
      });
      dispatch(requestConfirmation(false));
    });
}

export default authReducer;
