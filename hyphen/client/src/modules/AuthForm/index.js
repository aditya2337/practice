import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import InputField from '../../Components/InputField';
import Button from '../../Components/Button';
import Label from '../../Components/Label';

class AuthForm extends Component {
  state = {
    file: '',
    email: '',
    password: ''
  }

  onDrop = accepted => {
    const file = accepted[0];
    this.setState({ previewUrl: file.preview, file });
  };

  onChange = (e, purpose) => this.setState({ [purpose]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const { file, email, password } = this.state;

    this.props.onSubmit(file, email, password);
  }

  render() {
    const imageStyle = { width: 242, height: 242 };
    const isSignup = !this.props.isLogin;
    const { previewUrl, email, password } = this.state;
    return (
      <main className="pa4 black-80 w-100">
        <form className="measure center" onSubmit={this.handleSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">{isSignup ? 'Sign Up' : 'Log In'}</legend>
            {isSignup && (
              <div>
                <Label label="Avatar" labelFor="profile-picture" />
                {previewUrl ? (
                  <img style={imageStyle} src={previewUrl} />
                ) : (
                  <Dropzone
                    accept="image/jpeg, image/png"
                    onDrop={(accepted, rejected) => {
                      this.setState({ accepted, rejected });
                      this.onDrop(accepted, rejected);
                    }}
                    className="dropzone mt2"
                  >
                    <p>Try dropping some files here, or click to select files to upload.</p>
                  </Dropzone>
                )}
              </div>
            )}
            <div className="mt3">
              <Label label="Email" labelFor="email-address" />
              <InputField
                type="email"
                required
                onChange={(e) => this.onChange(e, 'email')}
                value={email}
              />
            </div>
            <div className="mv3">
              <Label label="Password" labelFor="password" />
              <InputField
                required
                type="password"
                onChange={(e) => this.onChange(e, 'password')}
                value={password}
              />
            </div>
          </fieldset>
          <div className="flex justify-between">
            <Button label="Cancel" onClick={() => this.props.useEmail(false)} />
            <Button isLoading={this.props.isAuthorizing} label="Submit" type="submit" />
          </div>
        </form>
      </main>
    )
  }
}

export default AuthForm;
