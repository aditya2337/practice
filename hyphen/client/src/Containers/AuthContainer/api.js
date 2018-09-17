import API from '../../constants/api';

export const signup = payload =>
  fetch(API.SIGNUP, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

export const login = payload =>
  fetch(API.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

export const confirmEmail = id =>
  fetch(`${API.CONFIRM}?id=${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const user = token =>
fetch(API.USER, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

