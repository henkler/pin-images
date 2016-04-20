import React from 'react';
import Image from './image';

const ImageList = (props) => (
  <div>
    {props.images.map(image =>
      <Image
        key={image._id}
        image={image}
      />)}
  </div>
);

ImageList.propTypes = {
  images: React.PropTypes.array.isRequired
};

export default ImageList;
