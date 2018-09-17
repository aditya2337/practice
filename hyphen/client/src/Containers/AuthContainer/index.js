import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { SpinLoader } from 'react-css-loaders';

import {
  registerUser,
  loginUser,
  clearMessages,
  setNotification,
  confirmAndLoginUser,
  returnUser,
} from './Auth.duck';
import { getBase64, parseQuery } from '../../helpers';

import Auth from './Auth';

class AuthContainer extends Component {
  state = {
    showForm: false,
    hasMessages: false
  }

  componentDidMount() {
    const queries = parseQuery(this.props.location.search);
    if ('id' in queries) {
      this.props.confirmAndLoginUser(queries.id);
    } else if ('token' in queries) {
      this.props.returnUser(queries.token);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { message } = nextProps.notification;
    if (this.props.notification.message !== message && message !== null) {
      this.setState({ hasMessages: true });
    }
  }

  useEmail = bool => this.setState({ showForm: bool });
  closeMessages = () => {
    this.setState({ hasMessages: false });
    this.props.clearMessages();
  };

  onSubmit = (file, email, password) => {
    let payload = { file, email, password };
    if (this.props.location.pathname === '/login') {
      payload = { email, password };
      return this.props.loginUser(payload);
    }
    if (typeof file === 'object' && 'preview' in file) {
      getBase64(file)
      .then(uri => {
        payload = Object.assign({}, payload, {
          file: uri
        });
        this.props.registerUser(payload);
      })
      .catch(e => console.error(e));
    } else {
      this.props.registerUser(payload);
    }
  }

  render() {
    console.log(this.props.isConfirming)
    return this.props.isLoggedIn
      ? <Redirect to="/" />
      : this.props.isConfirming ? (
        <div className="vh-100 flex justify-center items-center">
          <SpinLoader size={5} style={{ margin: 0 }} />
        </div>
      ) : (
      <Auth
        isLogin={this.props.location.pathname === '/login'}
        showForm={this.state.showForm}
        hasMessages={this.state.hasMessages}
        onClose={this.closeMessages}
        useEmail={this.useEmail}
        onSubmit={this.onSubmit}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => ({
  isAuthorizing: state.auth.isAuthorizing,
  isLoggedIn: state.auth.isLoggedIn,
  notification: state.auth.notification,
  isConfirming: state.auth.isConfirming,
 });
const mapDispatchToProps = dispatch => ({
  registerUser: payload => dispatch(registerUser(payload)),
  loginUser: payload => dispatch(loginUser(payload)),
  clearMessages: () => dispatch(clearMessages()),
  setNotification: (messageType, message) => dispatch(setNotification(messageType, message)),
  confirmAndLoginUser: id => dispatch(confirmAndLoginUser(id)),
  returnUser: token => dispatch(returnUser(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);