import React from 'react';
import Paper from 'material-ui/Paper';
import { Card, CardMedia, CardActions, CardTitle } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import IconPinDrop from 'material-ui/svg-icons/maps/pin-drop';
import IconFavorite from 'material-ui/svg-icons/action/favorite';
import IconClear from 'material-ui/svg-icons/content/clear';

const styles = {
  paper: {
    width: 350,
    margin: 10
  },
  actions: {
    textAlign: 'center'
  },
  thumbnailContainer: {
    textAlign: 'center'
  },
  thumbnail: {
    height: 200,
    width: 'auto'
  },
  largeIcon: {
    width: 60,
    height: 60
  },
  large: {
    width: 70,
    height: 70,
    padding: 10
  }
};

class Image extends React.Component {
  constructor(props) {
    super(props);

    this.handlePinClick = this.handlePinClick.bind(this);
    this.handleUnpinClick = this.handleUnpinClick.bind(this);
  }

  handlePinClick() {
    this.props.image.pin(this.props.image.description);
  }

  handleUnpinClick() {
    this.props.image.unpin();
  }

  renderActions() {
    const image = this.props.image;
    const actionButtons = [];

    if (image.canPin()) {
      actionButtons.push(
        <IconButton
          key="action_pin"
          label="Pin"
          tooltip="Pin Image"
          style={styles.large}
          iconStyle={styles.largeIcon}
          onClick={ this.handlePinClick }
        >
          <IconFavorite color="#bd081c" />
        </IconButton>);
    }

    if (image.canUnpin()) {
      actionButtons.push(
        <IconButton
          key="action_unpin"
          label="Unpin"
          tooltip="Unpin Image"
          style={styles.large}
          iconStyle={styles.largeIcon}
          onClick={ this.handleUnpinClick }
        >
          <IconClear />
        </IconButton>);
    }

    if (actionButtons.length > 0) {
      return (
        <CardActions style={styles.actions} >
          {actionButtons}
        </CardActions>
      );
    }

    return null;
  }

  render() {
    return (
      <Paper style={styles.paper} zDepth={4}>
        <Card>
          <CardMedia>
            <img role="presentation" src={this.props.image.url} />
          </CardMedia>
          <CardTitle
            title={this.props.image.description}
          />
          {this.renderActions()}
        </Card>
      </Paper>
    );
  }
}

Image.propTypes = {
  image: React.PropTypes.object.isRequired
};

Image.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Image;
