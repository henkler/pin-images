import React from 'react';
import PinList from '../containers/pinList';

import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
    margin: 12
  }
};

const MyPins = (props, context) => (
  <div>
    <RaisedButton
      label="Add Image"
      style={styles.button}
      primary={true}
      onClick={() => context.router.push('/addimage')}
    />
    <PinList
      publication={'myPins'}
    />
  </div>
);

MyPins.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default MyPins;
