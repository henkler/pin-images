import React from 'react';
import { Meteor } from 'meteor/meteor';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  button: {
    borderRadius: 10,
    color: '#fff'
  }
};

class LoginButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.doLogin = this.doLogin.bind(this);
  }

  doLogin() {
    if (this.context.currentUser) {
      Meteor.logout(() => {
        this.context.showMessage('Successfully logged out');
        this.forceUpdate();
        this.context.router.push('/');
      });
    } else {
      Meteor.loginWithTwitter({
        requestPermissions: ['email']
      }, (err) => {
        if (err) {
          this.context.showMessage('Error logging in with Twitter');
        } else {
          this.context.showMessage('Successfully logged in');
          this.forceUpdate();
        }
      });
    }
  }

  render() {
    return (
      <FlatButton
        label={ this.context.currentUser ? 'Sign Out' : 'Sign In'}
        style={styles.button}
        backgroundColor="rgb(0, 188, 212)"
        onTouchTap={this.doLogin}
      />
    );
  }
}

LoginButton.contextTypes = {
  router: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object,
  showMessage: React.PropTypes.func.isRequired
};

export default LoginButton;
