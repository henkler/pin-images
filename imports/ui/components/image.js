import React from 'react';
import Paper from 'material-ui/Paper';
import { Card, CardMedia, CardActions, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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
        <FlatButton
          key="action_pin"
          label="Pin"
          onClick={ this.handlePinClick }
        />);
    }

    if (image.canUnpin()) {
      actionButtons.push(
        <FlatButton
          key="action_unpin"
          label="Unpin"
          onClick={ this.handleUnpinClick }
        />);
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
          <CardTitle
            title={this.props.image.description}
          />
          <CardMedia>
            <img role="presentation" src={this.props.image.url} />
          </CardMedia>
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
