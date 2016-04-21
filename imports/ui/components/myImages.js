import React from 'react';
import AddImage from './addImage';
import ImageList from '../containers/imageList';

const MyImages = () => (
  <div>
    <AddImage />
    <ImageList
      publication={'myImages'}
    />
  </div>
);

export default MyImages;
