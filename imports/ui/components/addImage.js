import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { insert } from '/imports/api/images/methods';

const styles = {
  paper: {
    width: 500,
    margin: 10,
    padding: 10
  }
};

class AddImage extends React.Component {
  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
  }

  getFormData() {
    const url = this.refs.urlInput.getValue().trim();
    const description = this.refs.descriptionInput.getValue().trim();

    return {
      url,
      description
    };
  }

  handleSave() {
    const image = this.getFormData();
    insert.call(image);

    this.context.router.goBack();
  }

  render() {
    return (
      <Paper style={styles.paper} zDepth={4}>
        <label>Image URL: </label>
        <TextField
          ref="urlInput"
          hintText="Image URL"
          type="url"
        />
        <br />
        <label>Description: </label>
        <TextField
          ref="descriptionInput"
          hintText="Description"
        />
        <br />
        <RaisedButton label="Save" primary onClick={this.handleSave} />
      </Paper>
    );
  }
}

AddImage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default AddImage;
