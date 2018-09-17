export const fetchApi = (apiFunc, params) => {
  return apiFunc(...params)
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
}

export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      reject('Error: ', error);
    };
  })
}

export const getErrorMessage = (err) => {
  const allErrors = {
    'not_active': 'This email is not confirmed, please confirm and try again!',
    'not_found': 'User not found!',
    'wrong_password': 'Password and email do not match',
    'user_exists': 'This email is already used!',
    'link_expired': 'This link is expired!'
  }

  const errorMessage = err in allErrors ? allErrors[err] : 'oops, something went wrong, please try again!';

  return errorMessage;
}

export const parseQuery = qstr => {
  const query = {};
  const a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
  for (let i = 0; i < a.length; i++) {
    const b = a[i].split('=');
    query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
  }
  return query;
};
