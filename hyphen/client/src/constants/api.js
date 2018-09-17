const URL = 'http://localhost:5555';

const API = {
  SIGNUP: `${URL}/api/v1/signup`,
  LOGIN: `${URL}/api/v1/login`,
  UPDATE_EMAIL: `${URL}/api/v1/update`,
  CONFIRM: `${URL}/api/v1/confirm`,
  GOOGLE: `${URL}/api/v1/auth/google/start`,
  USER: `${URL}/api/v1/return/user`,
};

export default API;
