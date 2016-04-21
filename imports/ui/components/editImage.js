import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const styles = {
  button: {
    margin: 12
  },
  deleteButton: {
    margin: 12,
    marginRight: 100
  }
};

class EditImage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  getImageData() {
    const description = this.refs.descriptionInput.getValue().trim();

    return {
      description
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleCancel() {
    this.handleClose();
  }

  handleSave() {
    const image = this.getImageData();

    try {
      this.props.image.edit(image.description);
      this.context.showMessage('Pin Changed');
      this.handleClose();
    } catch (ex) {
      this.context.showMessage(`Error: ${ex.reason}`, true);
    }
  }

  handleDelete() {
    try {
      this.props.image.unpin();
      this.context.showMessage('Pin Deleted');
      this.handleClose();
    } catch (ex) {
      this.context.showMessage(`Error: ${ex.reason}`, true);
    }
  }

  render() {
    const actions = [
      <RaisedButton
        label="Delete Pin"
        style={styles.deleteButton}
        secondary
        onTouchTap={this.handleDelete}
      />,
      <RaisedButton
        label="Cancel"
        style={styles.button}
        onTouchTap={this.handleCancel}
      />,
      <RaisedButton
        label="Update Pin"
        style={styles.button}
        primary
        onTouchTap={this.handleSave}
      />
    ];

    return (
      <div>
        <Dialog
          title="Edit Pin"
          actions={actions}
          modal
          open={this.state.open}
        >
          <label>Description: </label>
          <TextField
            ref="descriptionInput"
            hintText="Description"
            defaultValue={this.props.image.description}
          />
        </Dialog>
      </div>
    );
  }
}

EditImage.propTypes = {
  image: React.PropTypes.object.isRequired
};

EditImage.contextTypes = {
  showMessage: React.PropTypes.func.isRequired
};

export default EditImage;
