import React from 'react';
import ImageList from '../containers/imageList';

import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
    margin: 12
  }
};

const MyImages = (props, context) => (
  <div>
    <RaisedButton
      label="Add Image"
      style={styles.button}
      primary={true}
      onClick={() => context.router.push('/addimage')}
    />
    <ImageList
      publication={'myImages'}
    />
  </div>
);

MyImages.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default MyImages;
