import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ImageList from '../containers/imageList';

const styles = {
  button: {
    margin: 12
  }
};

const UserImages = (props, context) => (
  <div>
    <RaisedButton
      label="Discover Images"
      style={styles.button}
      primary
      onClick={() => context.router.push('/')}
    />
    <ImageList
      publication={'userImages'} userId={props.params.userId}
    />
  </div>
);

UserImages.propTypes = {
  params: React.PropTypes.object.isRequired
};

UserImages.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default UserImages;
