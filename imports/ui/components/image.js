import React from 'react';
import Paper from 'material-ui/Paper';
import { Card, CardMedia, CardActions, CardTitle } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconFavorite from 'material-ui/svg-icons/action/favorite';
import IconModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import EditImage from './editImage';

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
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handlePinClick() {
    try {
      this.props.image.pin(this.props.image.description);
      this.context.showMessage('Image Pinned');
    } catch (ex) {
      this.context.showMessage(`Error: ${ex.reason}`);
    }
  }

  handleEditClick() {
    this.refs.editImage.handleOpen();
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

    if (image.canEdit()) {
      actionButtons.push(
        <IconButton
          key="action_edit"
          label="Edit"
          tooltip="Edit Pin"
          style={styles.large}
          iconStyle={styles.largeIcon}
          onClick={ this.handleEditClick }
        >
          <IconModeEdit />
          <EditImage ref="editImage" image={this.props.image} />
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
  router: React.PropTypes.object.isRequired,
  showMessage: React.PropTypes.func.isRequired
};

export default Image;
