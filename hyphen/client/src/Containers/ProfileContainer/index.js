import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../Components/Header';
import Button from '../../Components/Button';
import Messages from '../../Components/Messages';
import Profile from './Profile';

import { logout } from '../AuthContainer/Auth.duck';
import { updateEmail, setNotification } from './profile.duck';

class ProfileContainer extends Component {
  state = {
    editable: false,
    hasMessages: false
  }

  componentWillReceiveProps(nextProps) {
    const { message } = nextProps.notification;
    if (this.props.notification.message !== message && message !== null) {
      this.setState({ hasMessages: true });
    }
  }

  editEmail = editable => this.setState({ editable });

  onClose = () => {
    this.setState({ hasMessages: false });
    this.props.setNotification('success', null);
  }

  render() {
    return (
      <div>
        <Header label="Welcome" />
        <div className="flex items-center flex-column">
          <Button label="LOGOUT" onClick={() => this.props.logout()} />
          {this.state.hasMessages && (
            <Messages
              className="w-50 mt3"
              message={this.props.notification.message}
              onClose={this.onClose}
              isError={this.props.notification.type === 'error'}
            />
          )}
        </div>
        <Profile
          editable={this.state.editable}
          editEmail={this.editEmail}
          {...this.props}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthorizing: state.auth.isAuthorizing,
  isLoggedIn: state.auth.isLoggedIn,
  profile: state.profile.profile,
  notification: state.profile.notification,
  isUpdating: state.profile.isUpdating,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  updateEmail: payload => dispatch(updateEmail(payload)),
  setNotification: (messageType, message) => dispatch(setNotification(messageType, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
