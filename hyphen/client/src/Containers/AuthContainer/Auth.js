import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../Components/Header';
import Messages from '../../Components/Messages';

import AuthButtons from '../../modules/AuthButtons';
import AuthForm from '../../modules/AuthForm';

const Auth = (props) => {
  let label = `${props.isLogin ? 'Login' : 'Signup'} to Hyphen`;
  return (
    <div className="vh-100 flex flex-column items-center">
      <Header label={label} />
      {props.hasMessages && (
        <Messages
          className="w-50"
          message={props.notification.message}
          onClose={props.onClose}
          isError={props.notification.type === 'error'}
        />
      )}
      <div className="mt4  w-50">
        <div className="flex justify-center flex-auto">
          {props.showForm ? (
            <AuthForm
              isLogin={props.isLogin}
              useEmail={props.useEmail}
              onSubmit={props.onSubmit}
              isAuthorizing={props.isAuthorizing}
              setNotification={props.setNotification}
            />
          ) : (
            <AuthButtons
              label={label}
              onEmailClick={props.useEmail}
            />
          )}
        </div>
        <Link
          to={props.isLogin ? '/signup' : '/login'}
          className="f6 link dim black db bn mt3 flex justify-center"
        >
          {!props.isLogin ? 'Existing user? Log in here' : 'New? Sign up here'}
        </Link>
      </div>
    </div>
  );
};

export default Auth;