import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import NavigationApps from 'material-ui/svg-icons/navigation/apps';
import ActionHome from 'material-ui/svg-icons/action/home';
import AVRepeat from 'material-ui/svg-icons/av/repeat';

import AccountsUIWrapper from '../components/accountsUIWrapper';

const styles = {
  link: {
    textDecoration: 'none'
  }
};

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = { open: false };
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  renderMenuItems() {
    const menuItems = [];

    menuItems.push(
      <Link key="item_home" to="/" style={styles.link}>
        <MenuItem leftIcon={<ActionHome />} onTouchTap={ this.handleClose }>
          Home
        </MenuItem>
      </Link>
    );

    menuItems.push(
      <Link key="item_mypins" to="/mypins" style={styles.link}>
        <MenuItem leftIcon={<ActionHome />} onTouchTap={ this.handleClose }>
          My Pins
        </MenuItem>
      </Link>
    );

    menuItems.push(
      <MenuItem key="item_login" insetChildren={true} onTouchTap={ this.handleClose }>
        <AccountsUIWrapper />
      </MenuItem>
    );

    return menuItems;
  }

  render() {
    return (
      <Drawer
        docked={false}
        width={350}
        open={this.state.open}
        onRequestChange={open => this.setState({ open })}
      >
        {this.renderMenuItems()}
      </Drawer>
    );
  }
}

export default Navigation;
