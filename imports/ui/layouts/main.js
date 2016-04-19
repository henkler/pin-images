import React from 'react';
import AppBar from 'material-ui/AppBar';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navigation from './navigation';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick() {
    this.refs.navBar.handleToggle();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="Pin Images"
            onLeftIconButtonTouchTap={this.handleMenuClick}
          />
          <Navigation ref="navBar" />
          { this.props.children }
        </div>
      </MuiThemeProvider>
    );
  }
}

MainLayout.propTypes = {
  children: React.PropTypes.object
};

export default MainLayout;
