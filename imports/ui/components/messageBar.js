import React from 'react';
import Snackbar from 'material-ui/Snackbar';

class MessageBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.defaultMessageState();

    this.showMessage = this.showMessage.bind(this);
    this.resetMessageState = this.resetMessageState.bind(this);
  }

  showMessage(message) {
    this.setState({
      open: true,
      message
    });
  }

  defaultMessageState() {
    return {
      open: false,
      message: ''
    };
  }

  resetMessageState() {
    this.setState(this.defaultMessageState());
  }

  render() {
    return (
      <Snackbar
        open={this.state.open}
        message={this.state.message}
        autoHideDuration={4000}
        onRequestClose={this.resetMessageState}
      />
    );
  }
}

export default MessageBar;
