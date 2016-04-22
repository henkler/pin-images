import React from 'react';
import AppBar from 'material-ui/AppBar';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navigation from './navigation';
import MessageBar from '../components/messageBar';
import LoginButton from '../components/loginButton';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  getChildContext() {
    return {
      currentUser: this.props.currentUser,
      showMessage: this.showMessage
    };
  }

  handleMenuClick() {
    this.refs.navBar.handleToggle();
  }

  showMessage(message) {
    this.refs.messageBar.showMessage(message);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <AppBar
            title="Pin Images"
            onLeftIconButtonTouchTap={ this.handleMenuClick }
            iconElementRight={<LoginButton />}
          />
          <Navigation ref="navBar" />
          { this.props.children }
          <MessageBar ref="messageBar" />
        </div>
      </MuiThemeProvider>
    );
  }
}

MainLayout.propTypes = {
  currentUser: React.PropTypes.object,
  children: React.PropTypes.object
};

MainLayout.childContextTypes = {
  currentUser: React.PropTypes.object,
  showMessage: React.PropTypes.func.isRequired
};

export default MainLayout;
