import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Pins } from '/imports/api/pins/pins';
import { Images } from '/imports/api/images/images';
import PinList from '../components/pinList';

const composer = (props, onData) => {
  if (Meteor.subscribe(props.publication).ready()) {
    const pins = Pins.find().fetch();

    pins.forEach(pin => {
      pin.image = Images.findOne(pin.imageId);
    });

    onData(null, { pins });
  }
};

export default composeWithTracker(composer)(PinList);
