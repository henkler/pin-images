/* eslint no-param-reassign: ["error", { "props": false }] */
import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Pins } from '/imports/api/pins/pins';
import { Images } from '/imports/api/images/images';
import ImageList from '../components/imageList';

const composer = (props, onData) => {
  if (Meteor.subscribe(props.publication).ready()) {
    const images = Images.find().fetch();

    images.forEach(image => {
      const pin = Pins.findOne({ imageId: image._id });
      if (pin) {
        image.description = pin.description;
      }
    });

    onData(null, { images });
  }
};

export default composeWithTracker(composer)(ImageList);
