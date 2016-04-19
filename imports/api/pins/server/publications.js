/* eslint-disable prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Pins } from '../pins';
import { Images } from '../../images/images';

Meteor.publishComposite('myPins', {
  find() {
    if (!this.userId) {
      return this.ready();
    }

    const query = {};

    if (this.userId) {
      query.userId = this.userId;
    }

    return Pins.find(query);
  },
  children: [
    {
      find(pin) {
        return Images.find({ _id: pin.imageId });
      }
    }
  ]
});

Meteor.publishComposite('allPins', {
  find() {
    return Pins.find({});
  },
  children: [
    {
      find(pin) {
        return Images.find({ _id: pin.imageId });
      }
    }
  ]
});
