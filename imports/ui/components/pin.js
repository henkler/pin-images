import React from 'react';
import Paper from 'material-ui/Paper';
import { Card, CardMedia, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  paper: {
    width: 350,
    margin: 10,
    display: 'inline-block'
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

class Pin extends React.Component {
  constructor(props) {
    super(props);

    this.handlePinClick = this.handlePinClick.bind(this);
    this.handleUnpinClick = this.handleUnpinClick.bind(this);
  }

  handlePinClick() {
    this.props.pin.image.pin(this.props.pin.description);
  }

  handleUnpinClick() {
    this.props.pin.image.unpin();
  }

  renderActions() {
    const pin = this.props.pin;
    const image = pin.image;
    const actionButtons = [];

    if (image.canPin()) {
      actionButtons.push(<FlatButton key="action_pin" label="Pin" onClick={ this.handlePinClick } />);
    }

    if (image.canUnpin()) {
      actionButtons.push(<FlatButton key="action_unpin" label="Unpin" onClick={ this.handleUnpinClick } />);
    }

    if (actionButtons.length > 0) {
      return (
        <CardActions style={styles.actions} >
          {actionButtons}
        </CardActions>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <Paper style={styles.paper} zDepth={4}>
        <Card>
          <CardTitle
            title={this.props.pin.description}
          />
          <CardMedia>
            <img src={this.props.pin.image.url} />
          </CardMedia>
          {this.renderActions()}
        </Card>
      </Paper>
    );
  }
}

Pin.propTypes = {
  pin: React.PropTypes.object.isRequired
};

Pin.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Pin;
