import { update } from './api';
import { fetchApi, getErrorMessage } from '../../helpers';

// action-types
const SET_PROFILE = 'PROFILE_SET_PROFILE';
const CLEAR_PROFILE = 'PROFILE_CLEAR_PROFILE';
const REQUEST_UPDATE = 'PROFILE_REQUEST_UPDATE';
const SET_NOTIFICATION = 'PROFILE_SET_NOTIFICATION';

// reducer
const profileReducer = (
  state = {
    isUpdating: false,
    profile: JSON.parse(localStorage.getItem('profile')) !== null
    ? JSON.parse(localStorage.getItem('profile'))
    : {},
    notification: {
      type: 'success',
      message: null
    }
  },
  action
) => {
  switch (action.type) {
    case SET_PROFILE:
      const newProfile = {
        ...state.profile,
        ...action.profile
      };
      localStorage.setItem('profile', JSON.stringify(newProfile));
      return Object.assign({}, state, {
        profile: newProfile
      });
    case CLEAR_PROFILE:
      return Object.assign({}, state, {
        profile: {}
      });
    case REQUEST_UPDATE:
      return Object.assign({}, state, {
        isUpdating: action.isUpdating
      });
    case SET_NOTIFICATION:
      return Object.assign({}, state, {
        notification: {
          type: action.messageType,
          message: action.message
        }
      });
    default:
      return state;
  }
}

// actions
const requestingUpdate = isUpdating => ({
  type: REQUEST_UPDATE,
  isUpdating
});

export const setProfile = profile => ({
  type: SET_PROFILE,
  profile
});

export const clearProfile = () => ({
  type: CLEAR_PROFILE
});

export const setNotification = (messageType, message) => ({
  type: SET_NOTIFICATION,
  messageType,
  message
});

export const updateEmail = payload => (dispatch, getState) => {
  dispatch(requestingUpdate(true));
  const { token } = getState().auth;
  fetchApi(update, [payload, token])
    .then(res => {
      dispatch(setProfile(res.profile));
      dispatch(setNotification('success', 'Email updated successfully!'))
      dispatch(requestingUpdate(false));
    })
    .catch(e => {
      e.text().then(response => {
        let errorMessage = JSON.parse(response);
        errorMessage = getErrorMessage(errorMessage.error);
        dispatch(setNotification('error', errorMessage));
      });
      dispatch(requestingUpdate(false));
    });
}


export default profileReducer;
