import React from 'react';
import Masonry from 'react-masonry-component';
import Image from './image';

const ImageList = (props) => {
  if (props.isReady) {
    return (
      <Masonry>
        {props.images.map(image =>
          <Image
            key={image._id}
            image={image}
          />)}
      </Masonry>
    );
  }

  return null;
};

ImageList.propTypes = {
  images: React.PropTypes.array.isRequired,
  isReady: React.PropTypes.bool.isRequired
};

export default ImageList;
