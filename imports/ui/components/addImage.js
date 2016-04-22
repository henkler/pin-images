import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { insert } from '/imports/api/images/methods';

const styles = {
  button: {
    margin: 12
  }
};

class AddImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  getFormData() {
    const url = this.refs.urlInput.getValue().trim();
    const description = this.refs.descriptionInput.getValue().trim();

    return {
      url,
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
    const image = this.getFormData();
    try {
      insert.call(image);
      this.handleClose();
      this.context.showMessage('Image Added');
    } catch (ex) {
      this.context.showMessage(`Error: ${ex.reason}`, true);
    }
  }

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        style={styles.button}
        onTouchTap={this.handleCancel}
      />,
      <RaisedButton
        label="Save"
        style={styles.button}
        primary
        onTouchTap={this.handleSave}
      />
    ];

    return (
      <div>
        <RaisedButton
          label="Add Image"
          style={styles.button}
          primary
          onTouchTap={this.handleOpen}
        />
        <Dialog
          title="Add Image"
          actions={actions}
          modal
          open={this.state.open}
        >
          <label>Image URL: </label>
          <TextField
            ref="urlInput"
            hintText="Image URL"
            type="url"
            fullWidth
          />
          <br />
          <label>Description: </label>
          <TextField
            ref="descriptionInput"
            hintText="Description"
            fullWidth
            maxLength={40}
          />
        </Dialog>
      </div>
    );
  }
}

AddImage.contextTypes = {
  showMessage: React.PropTypes.func.isRequired
};

export default AddImage;
