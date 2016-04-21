import React from 'react';
import Masonry from 'react-masonry-component';
import Image from './image';

const ImageList = (props) => (
  <Masonry>
    {props.images.map(image =>
      <Image
        key={image._id}
        image={image}
      />)}
  </Masonry>
);

ImageList.propTypes = {
  images: React.PropTypes.array.isRequired
};

export default ImageList;
