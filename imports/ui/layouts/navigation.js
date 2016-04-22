import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconHome from 'material-ui/svg-icons/action/home';
import IconInfo from 'material-ui/svg-icons/action/info';
import IconImageCollectionsBookmark from 'material-ui/svg-icons/image/collections-bookmark';
import IconAccountCircle from 'material-ui/svg-icons/action/account-circle';

import LoginButton from '../components/loginButton';

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
        <MenuItem leftIcon={<IconHome />} onTouchTap={ this.handleClose }>
          Home
        </MenuItem>
      </Link>
    );

    if (Meteor.userId()) {
      menuItems.push(
        <Link key="item_myimages" to="/myimages" style={styles.link}>
          <MenuItem leftIcon={<IconImageCollectionsBookmark />} onTouchTap={ this.handleClose }>
            My Images
          </MenuItem>
        </Link>
      );
    }

    menuItems.push(
      <Link key="item_about" to="/about" style={styles.link}>
        <MenuItem leftIcon={<IconInfo />} onTouchTap={ this.handleClose }>
          About
        </MenuItem>
      </Link>
    );

    menuItems.push(
      <MenuItem key="item_login" leftIcon={<IconAccountCircle />} onTouchTap={ this.handleClose }>
        <LoginButton />
      </MenuItem>
    );

    return menuItems;
  }

  render() {
    return (
      <Drawer
        docked={false} // eslint-disable-line jsx-boolean-value
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
