import React from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { Card, CardMedia, CardActions, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconFavorite from 'material-ui/svg-icons/action/favorite-border';
import IconModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import EditImage from './editImage';

const styles = {
  paper: {
    width: 350,
    margin: 10
  },
  actions: {
    textAlign: 'right'
  },
  thumbnailContainer: {
    textAlign: 'center'
  },
  thumbnail: {
    height: 200,
    width: 'auto'
  },
  mediumIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10
  },
  mediumIconButton: {
    width: 50,
    height: 50,
    padding: 10
  },
  mediaOverlay: {
    background: 'initial'
  },
  pinCount: {
    float: 'right',
    display: 'inline-block',
    width: 40,
    height: 40,
    lineHeight: '40px',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#bd081c',
    fontSize: '1.2em',
    borderRadius: '50%'
  },
  userLink: {
    display: 'inline-block',
    fontSize: '1.2em',
    lineHeight: '40px',
    color: 'black'
  },
  link: {
    textDecoration: 'none'
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
          style={styles.mediumIconButton}
          iconStyle={styles.mediumIcon}
          onClick={ this.handlePinClick }
        >
          <IconFavorite color="#bd081c" />
        </IconButton>);
    } else if (image.canEdit()) {
      actionButtons.push(
        <IconButton
          key="action_edit"
          label="Edit"
          tooltip="Edit Pin"
          style={styles.mediumIconButton}
          iconStyle={styles.mediumIcon}
          onClick={ this.handleEditClick }
        >
          <IconModeEdit color="bd081c" />
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
          <CardMedia
            overlay={this.renderActions()}
            overlayContentStyle={styles.mediaOverlay}
          >
            <img role="presentation" src={this.props.image.url} />
          </CardMedia>
          <CardTitle
            title={this.props.image.description}
          />
          <Divider />
          <CardText>
            <div style={styles.userLink}>
              <Link to={`/images/${this.props.image.user._id}`} style={styles.link}>
                <span>{this.props.image.user.profile.name}</span>
              </Link>
            </div>
            <div style={styles.pinCount}>
              <span>{this.props.image.pinCount}</span>
            </div>
          </CardText>
        </Card>
        <EditImage ref="editImage" image={this.props.image} />
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
