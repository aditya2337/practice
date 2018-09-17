import React, { Component } from 'react';
import Input from '../../Components/InputField';
import Button from '../../Components/Button';
import Label from '../../Components/Label';


class EditEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.email
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email } = this.state;

    const payload = { email };

    this.props.updateEmail(payload);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ width: '50vw' }}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <Label label="Email" labelFor="email-address" />
          <Input
            required
            value={this.state.email}
            type="email"
            onChange={e => this.setState({ email: e.target.value })}
          />
        </fieldset>
        <div className="flex justify-between">
          <Button label="Cancel" onClick={() => this.props.editEmail(false)} />
          <Button isLoading={this.props.isUpdating} label="Update" type="submit" />
        </div>
      </form>
    )
  }
}

const Profile = props => (
  <section className="flex items-center pa5-ns vh-100 w-100 flex-column">
    <article className="hide-child relative mw5 center">
      <img
        style={{ width: 242, height: 242 }}
        src={props.profile.avatar}
        className="db ba b--black-20"
        alt="Avatar"
      />
    </article>
    <div className="mt4">
      {
        props.editable ? (
          <EditEmail
            email={props.profile.email}
            editEmail={props.editEmail}
            updateEmail={props.updateEmail}
            isUpdating={props.isUpdating}
          />
        ) : (
          <div>
            <Label label="Email" labelFor="email-address" />
            <span>{props.profile.email}</span>
            <i
              className="fas fa-edit ml3 pointer"
              onClick={() => props.editEmail(true)}
            />
          </div>
        )
      }
    </div>
  </section>
);

export default Profile;
