import React from 'react';
import AppBar from 'material-ui/AppBar';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navigation from './navigation';
import MessageBar from '../components/messageBar';

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
    return { showMessage: this.showMessage };
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
  children: React.PropTypes.object
};

MainLayout.childContextTypes = {
  showMessage: React.PropTypes.func.isRequired
};

export default MainLayout;
