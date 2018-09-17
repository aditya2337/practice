import API from '../../constants/api';

export const update = (payload, authToken) =>
  fetch(API.UPDATE_EMAIL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(payload),
  });
