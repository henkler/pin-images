import React from 'react';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ActionHome from 'material-ui/svg-icons/action/home';

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
      <Link key="item_myimages" to="/myimages" style={styles.link}>
        <MenuItem leftIcon={<ActionHome />} onTouchTap={ this.handleClose }>
          My Images
        </MenuItem>
      </Link>
    );

    menuItems.push(
      <Link key="item_allimages" to="/images" style={styles.link}>
        <MenuItem leftIcon={<ActionHome />} onTouchTap={ this.handleClose }>
          Discover Images
        </MenuItem>
      </Link>
    );

    menuItems.push(
      <MenuItem key="item_login" insetChildren onTouchTap={ this.handleClose }>
        <AccountsUIWrapper />
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
